import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { publicEnv } from "@repo/env/public";

import { notifyAuthExpired } from "./auth/auth-session";
import { shouldSkipTokenRefresh } from "./auth/is-auth-request";
import { refreshAccessToken } from "./auth/refresh-access-token";
import { clearAuthTokens, getAccessToken } from "./auth/token-storage";

export const AXIOS_INSTANCE = axios.create({
  baseURL: publicEnv.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processRefreshQueue(error: unknown | null, token?: string): void {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
      return;
    }
    if (token) {
      resolve(token);
      return;
    }
    reject(new Error("Token refresh failed"));
  });
  refreshQueue = [];
}

function setAuthorizationHeader(
  config: InternalAxiosRequestConfig,
  token: string,
): void {
  config.headers.set("Authorization", `Bearer ${token}`);
}

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setAuthorizationHeader(config, accessToken);
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableAxiosRequestConfig
      | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      shouldSkipTokenRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token) => {
        setAuthorizationHeader(originalRequest, token);
        return AXIOS_INSTANCE(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const accessToken = await refreshAccessToken();
      processRefreshQueue(null, accessToken);
      setAuthorizationHeader(originalRequest, accessToken);
      return AXIOS_INSTANCE(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(refreshError);
      clearAuthTokens();
      notifyAuthExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error orval mutator contract
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export default customInstance;
