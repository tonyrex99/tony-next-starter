# API Architecture & OpenAPI Integration

This starter uses a **contract-first, type-safe API architecture** powered by Hey API (`@hey-api/openapi-ts`) and TanStack Query.

---

## 1. Overview & Data Flow

The API layer establishes a complete end-to-end type contract between the backend specification and frontend components:

```text
Backend API (or OpenAPI spec)
       │
       ▼
openapi/spec.json (or remote OPENAPI_SPEC_URL)
       │
       ▼
Hey API (@hey-api/openapi-ts via hey-api.config.ts)
       │
       ▼
src/lib/api/generated/ (Strictly Disposable Code)
       │
       ▼
src/features/<feature>/queries/ (Feature query & mutation hooks)
       │
       ▼
Feature Components (Fully typed props, inputs, and DTOs)
```

---

## 2. Configuration (`hey-api.config.ts`)

Hey API configuration defines the input specification, the client fetcher plugin, and the generated target directory:

```ts
import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: process.env.OPENAPI_SPEC_PATH || "openapi/spec.json",
  output: "src/lib/api/generated",
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/schemas",
    {
      name: "@hey-api/sdk",
      asClass: false,
    },
    {
      name: "@hey-api/typescript",
      enums: "javascript",
    },
  ],
});
```

---

## 3. Client & Server API Configuration

The base fetch client is configured centrally in `src/lib/api/client.ts` and `src/lib/api/server.ts`:

- `src/lib/api/client.ts`: Configures the browser HTTP client with the public base URL (`NEXT_PUBLIC_API_URL` or `/api`), request headers, and client-side authentication tokens.
- `src/lib/api/server.ts`: Configures server-side HTTP calls inside Server Components, Route Handlers, or Server Actions with server-only headers (`API_SECRET`, authorization cookies).

Features **never** configure their own raw HTTP fetch clients; they consume generated SDK operations through feature query wrappers.

---

## 4. Query Key Factories

Every feature using TanStack Query defines its own query-key factory colocated with the feature:

```ts
// src/features/example/queries/example.keys.ts
export const exampleKeys = {
  all: () => ["examples"] as const,
  lists: () => [...exampleKeys.all(), "list"] as const,
  list: (filters?: Record<string, unknown>) => [...exampleKeys.lists(), filters ?? {}] as const,
  details: () => [...exampleKeys.all(), "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};
```

This prevents key collision across different domains and ensures precise, granular cache invalidation on mutations:

```ts
// In a mutation hook:
queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
```

---

## 5. Explicit Developer Commands

### API Codegen

To regenerate the TypeScript API client and types from the OpenAPI specification:

```bash
pnpm api:generate
```

### Stale Code Verification

To verify whether the committed generated files in `src/lib/api/generated/` match the OpenAPI specification without modifying working files:

```bash
pnpm api:check
```

The script `scripts/check-api-freshness.mjs`:

1. Generates output to a temporary staging folder.
2. Compares the temporary output with `src/lib/api/generated/`.
3. Exits with code 0 if identical, or code 1 with clear diff diagnostics if stale.
4. Cleans up the temporary staging folder.

This check runs automatically in CI.

---

## 6. Strict Rules & Golden Directives

- ⚠️ **NEVER manually edit `src/lib/api/generated/`**: Any file in this folder is generated and disposable. Manual changes will be overwritten or cause CI to fail.
- ⚠️ **Do not run `api:generate` implicitly**: API generation must never run silently inside `pnpm lint` or `pnpm test`. It is an intentional, explicit developer action.
- ⚠️ **Never expose internal backend credentials**: Store backend URLs and secrets in server-only environment variables (`API_URL`, `OPENAPI_SPEC_URL`).
