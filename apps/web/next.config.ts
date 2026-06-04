import { loadEnvFiles } from "@repo/env/load-env-files";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

loadEnvFiles({ appDir });

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/query", "@repo/api-client", "@repo/env", "echarts", "zrender"],
};

export default nextConfig;
