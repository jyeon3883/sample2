import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";

export type AppEnvProfile = "dev" | "prod";

const PROFILE_FILES: Record<AppEnvProfile, string> = {
  dev: ".env.dev",
  prod: ".env.prod",
};

export function resolveAppEnvProfile(): AppEnvProfile {
  const explicit = process.env.APP_ENV;
  if (explicit === "dev" || explicit === "prod") {
    return explicit;
  }

  return process.env.NODE_ENV === "production" ? "prod" : "dev";
}

/** local → dev/prod → .env.local 순으로 env 파일을 로드합니다. */
export function loadEnvFiles(options: {
  appDir: string;
  rootDir?: string;
  profile?: AppEnvProfile;
}): void {
  const profile = options.profile ?? resolveAppEnvProfile();
  const rootDir = options.rootDir ?? path.resolve(options.appDir, "../..");
  const profileFile = PROFILE_FILES[profile];

  const candidates = [
    path.join(rootDir, profileFile),
    path.join(options.appDir, profileFile),
    path.join(rootDir, ".env.local"),
    path.join(options.appDir, ".env.local"),
  ];

  for (const envPath of candidates) {
    if (fs.existsSync(envPath)) {
      loadEnv({ path: envPath, override: true, quiet: true });
    }
  }
}
