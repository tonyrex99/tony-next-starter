import fs from "node:fs";
import { defineConfig } from "@hey-api/openapi-ts";

function loadEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    } catch {
      // Ignore reading error
    }
  }
}

// Load local environment files if present
loadEnvFile(".env.local");
loadEnvFile(".env");

// Resolve OpenAPI input from CLI override, URL env, PATH env, generic env, or local fallback
const input =
  process.env.OPENAPI_SPEC_INPUT ||
  process.env.OPENAPI_SPEC_URL ||
  process.env.OPENAPI_SPEC_PATH ||
  process.env.OPENAPI_SPEC ||
  "./openapi/spec.json";

export default defineConfig({
  input,
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
    "zod",
    "@tanstack/react-query",
  ],
});
