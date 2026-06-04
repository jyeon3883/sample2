import { z } from "zod";

import { commonEnvSchema, parseEnv } from "./shared";

const webEnvSchema = z.object({
  ...commonEnvSchema,
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

const webEnvSource = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
};

/** apps/web 에서 import 시 자동으로 검증 실행 */
export const webEnv: WebEnv = parseEnv(webEnvSchema, webEnvSource);
