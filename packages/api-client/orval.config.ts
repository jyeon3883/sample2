import { loadEnvFiles } from "@repo/env/load-env-files";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "orval";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const appTarget = process.env.APP_TARGET ?? "web";
const appDir = path.join(rootDir, "apps", appTarget);

loadEnvFiles({ appDir, rootDir });

const openApiTarget = process.env.ORVAL_OPENAPI_URL_MAIN ?? "./openapi/schema.yaml";

export default defineConfig({
  mainApi: {
    input: openApiTarget,
    output: {
      mode: "tags-split",
      target: "./src/generated/main/endpoints",
      schemas: "./src/generated/main/models",
      client: "react-query",
      httpClient: "axios",
      indexFiles: true,
      clean: true,
      override: {
        mutator: {
          path: "./src/axios-instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
});
