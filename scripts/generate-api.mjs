import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

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

// Load local environment variables if available
loadEnvFile(".env.local");
loadEnvFile(".env");

// Parse command line arguments
const args = process.argv.slice(2);
let customInput = null;
let saveToSpecJson = false;

for (const arg of args) {
  if (arg === "--save" || arg === "--sync") {
    saveToSpecJson = true;
  } else if (!arg.startsWith("--") && !customInput) {
    customInput = arg;
  }
}

// Determine resolved input: CLI argument -> OPENAPI_SPEC_URL -> OPENAPI_SPEC_PATH -> OPENAPI_SPEC -> fallback
const resolvedInput =
  customInput ||
  process.env.OPENAPI_SPEC_URL ||
  process.env.OPENAPI_SPEC_PATH ||
  process.env.OPENAPI_SPEC ||
  "./openapi/spec.json";

const isUrl = /^https?:\/\//i.test(resolvedInput);

console.log(`\n📡 OpenAPI Specification Resolution:`);
console.log(`   Source: ${resolvedInput} ${isUrl ? "(Remote URL)" : "(Local File)"}`);

// If it's a URL and save/sync flag is requested (or user specifically wants local mirror)
if (isUrl && saveToSpecJson) {
  try {
    console.log(`📥 Downloading OpenAPI spec from ${resolvedInput} to ./openapi/spec.json...`);
    const res = await fetch(resolvedInput);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    const formatted = JSON.stringify(JSON.parse(text), null, 2);
    fs.mkdirSync(path.dirname("./openapi/spec.json"), { recursive: true });
    fs.writeFileSync("./openapi/spec.json", formatted, "utf-8");
    console.log(`✓ Saved spec copy to ./openapi/spec.json`);
  } catch (err) {
    console.warn(
      `⚠️ Could not save local copy of spec: ${err.message}. Proceeding with remote URL generation.`
    );
  }
}

// Run Hey API with resolved input
try {
  console.log(`⚙️ Running Hey API codegen...`);
  execSync(`pnpm exec openapi-ts -f hey-api.config.ts`, {
    stdio: "inherit",
    env: {
      ...process.env,
      OPENAPI_SPEC_INPUT: resolvedInput,
    },
  });
  console.log(`✨ API client successfully generated in src/lib/api/generated/\n`);
} catch (err) {
  console.error(`\n❌ Failed to generate API client: ${err.message}`);
  process.exit(1);
}
