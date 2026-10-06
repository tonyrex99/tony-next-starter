import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: process.env.OPENAPI_SPEC_PATH || "./openapi/spec.json",
  output: {
    path: "./src/lib/api/generated",
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/schemas",
    {
      name: "@hey-api/sdk",
    },
    {
      name: "@hey-api/typescript",
      enums: "javascript",
    },
  ],
});
