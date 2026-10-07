# Configuration & Environment Variables

This document details the configuration architecture, environment variable validation, and security guidelines for the application.

---

## 1. Environment Architecture & Security Boundaries

Environment variables are partitioned into two strict security tiers:

```text
┌────────────────────────────────────────────────────────┐
│ SERVER-ONLY ENVIRONMENT VARIABLES                      │
│ - Accessible only in Node.js server runtime            │
│ - Never sent to browser client bundle                  │
│ - Examples: API_URL, AUTH_SECRET, OPENAPI_SPEC_URL     │
└────────────────────────────────────────────────────────┘
                           │
                 [Security Boundary]
                           │
┌────────────────────────────────────────────────────────┐
│ CLIENT-SAFE ENVIRONMENT VARIABLES (NEXT_PUBLIC_*)      │
│ - Inlined into browser JS at build time                │
│ - Must never contain credentials, keys, or secrets     │
│ - Examples: NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_API_URL  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Environment Validation (`src/config/environment.ts`)

Direct access to `process.env.*` across arbitrary application components is strictly forbidden. Instead, all variables are validated at startup through a Zod schema:

```ts
// src/config/environment.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Tony Next Starter"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().default("/api"),
  API_URL: z.string().default("http://localhost:3000/api"),
  OPENAPI_SPEC_PATH: z.string().default("openapi/spec.json"),
  OPENAPI_SPEC_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(8).default("development-fallback-secret-key-32chars"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  API_URL: process.env.API_URL,
  OPENAPI_SPEC_PATH: process.env.OPENAPI_SPEC_PATH,
  OPENAPI_SPEC_URL: process.env.OPENAPI_SPEC_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
});
```

If a required variable is missing or invalid, the build fails immediately with a descriptive error message explaining which variable is malformed.

---

## 3. Environment Files

- `.env.example`: Committed template documenting all supported environment variables with safe development defaults.
- `.env.local`: Local overrides. **Never committed to version control.**
- `.env.test.local`: Test environment overrides.

### Setup:

```bash
cp .env.example .env.local
```

---

## 4. Compile-Time Configuration Modules

Static application settings and metadata live under `src/config/`:

- `src/config/site.ts`: Global application metadata, branding names, footer links, and SEO defaults.
- `src/config/navigation.ts`: Main sidebar and navbar route definitions with titles, paths, and Lucide icons.
- `src/config/environment.ts`: Validated environment object.
