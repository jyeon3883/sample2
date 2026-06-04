import { z } from "zod";

import { commonEnvSchema, parseEnv } from "./shared";

const publicEnvSchema = z.object({
  ...commonEnvSchema,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

const publicEnvSource = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

/** api-client 등 앱에 종속되지 않는 공통 패키지에서 사용 */
export const publicEnv: PublicEnv = parseEnv(publicEnvSchema, publicEnvSource);
