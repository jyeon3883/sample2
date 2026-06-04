import axios from "axios";
import { publicEnv } from "@repo/env/public";

import { AUTH_REFRESH_PATH } from "./constants";
import { persistAuthTokens } from "./persist-tokens";
import type { AuthTokenPayload } from "./types";
import { clearAuthTokens, getRefreshToken } from "./token-storage";

/** 인터셉터 루프 방지: 메인 AXIOS_INSTANCE와 분리된 클라이언트 */
const refreshClient = axios.create({
  baseURL: publicEnv.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  try {
    const { data } = await refreshClient.post<AuthTokenPayload>(
      AUTH_REFRESH_PATH,
      { refreshToken },
    );

    persistAuthTokens(data);

    if (!data.accessToken) {
      throw new Error("Refresh response missing accessToken");
    }

    return data.accessToken;
  } catch (error) {
    clearAuthTokens();
    throw error;
  }
}
