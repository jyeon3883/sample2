import { z } from "zod";

function formatIssues(issues: z.ZodIssue[]): string {
  return issues.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`).join(", ");
}

export function parseEnv<T extends z.ZodTypeAny>(
  schema: T,
  source: Record<string, string | undefined>,
): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    throw new Error(`Invalid environment variables: ${formatIssues(result.error.issues)}`);
  }
  return result.data;
}

/** 모든 앱에서 공통으로 쓰는 env 스키마 조각 */
export const commonEnvSchema = {
  NEXT_PUBLIC_API_URL: z.string().url(),
};
