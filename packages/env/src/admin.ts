import { z } from "zod";

import { commonEnvSchema, parseEnv } from "./shared";

const adminEnvSchema = z.object({
  ...commonEnvSchema,
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_ADMIN_DASHBOARD_TITLE: z.string().min(1),
});

export type AdminEnv = z.infer<typeof adminEnvSchema>;

const adminEnvSource = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_ADMIN_DASHBOARD_TITLE: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_TITLE,
};

/** apps/admin 에서 import 시 자동으로 검증 실행 */
export const adminEnv: AdminEnv = parseEnv(adminEnvSchema, adminEnvSource);
