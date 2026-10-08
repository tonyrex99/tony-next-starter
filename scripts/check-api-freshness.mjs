import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const tempDir = path.join(projectRoot, "node_modules", ".tmp", "api-check");
const tempConfigPath = path.join(projectRoot, "node_modules", ".tmp", "hey-api.temp.config.ts");
const generatedDir = path.join(projectRoot, "src", "lib", "api", "generated");

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function loadEnvFile(filePath) {
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

loadEnvFile(".env.local");
loadEnvFile(".env");

const resolvedInput =
  process.env.OPENAPI_SPEC_INPUT ||
  process.env.OPENAPI_SPEC_URL ||
  process.env.OPENAPI_SPEC_PATH ||
  process.env.OPENAPI_SPEC ||
  "./openapi/spec.json";

try {
  cleanDir(tempDir);
  fs.mkdirSync(tempDir, { recursive: true });

  // Create temporary config pointing output to tempDir
  const normalizedTempDir = tempDir.replace(/\\/g, "/");
  const tempConfigContent = `import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "${resolvedInput.replace(/\\/g, "/")}",
  output: {
    path: "${normalizedTempDir}",
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
`;
  fs.writeFileSync(tempConfigPath, tempConfigContent, "utf-8");

  console.log("Checking API client freshness against OpenAPI specification...");

  execSync(`pnpm exec openapi-ts -f "${tempConfigPath.replace(/\\/g, "/")}"`, { stdio: "pipe" });

  if (!fs.existsSync(generatedDir)) {
    console.error(
      "❌ Stale API code detected: src/lib/api/generated does not exist. Run 'pnpm api:generate'."
    );
    process.exit(1);
  }

  function getFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getFiles(res));
      } else {
        files.push(res);
      }
    }
    return files;
  }

  const generatedFiles = getFiles(generatedDir).map((f) => path.relative(generatedDir, f));
  const tempFiles = getFiles(tempDir).map((f) => path.relative(tempDir, f));

  let isMatch = true;

  if (generatedFiles.length !== tempFiles.length) {
    isMatch = false;
  } else {
    for (const relPath of tempFiles) {
      const tempContent = fs.readFileSync(path.join(tempDir, relPath), "utf-8").trim();
      const targetPath = path.join(generatedDir, relPath);
      if (!fs.existsSync(targetPath)) {
        isMatch = false;
        break;
      }
      const existingContent = fs.readFileSync(targetPath, "utf-8").trim();
      if (tempContent !== existingContent) {
        isMatch = false;
        break;
      }
    }
  }

  cleanDir(tempDir);
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }

  if (!isMatch) {
    console.error(
      "❌ Stale API code detected: generated client differs from OpenAPI spec. Run 'pnpm api:generate'."
    );
    process.exit(1);
  }

  console.log("✓ Generated API client is up to date with OpenAPI specification.");
  process.exit(0);
} catch (error) {
  cleanDir(tempDir);
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
  console.error("API freshness check failed:", error.message);
  process.exit(1);
}
