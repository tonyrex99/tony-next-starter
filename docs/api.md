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
import fs from "node:fs";
import { defineConfig } from "@hey-api/openapi-ts";

// Automatically loads .env.local and .env
// Supports OPENAPI_SPEC_INPUT, OPENAPI_SPEC_URL, OPENAPI_SPEC_PATH, OPENAPI_SPEC
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
```

---

## 3. Generated Artifacts & Capabilities

Running `pnpm api:generate` produces the following artifacts in `src/lib/api/generated/`:

| File                           | Purpose                                    | Key Exports                                                                   |
| ------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------- |
| `sdk.gen.ts`                   | Fully-typed fetch SDK functions            | `getItems()`, `getItemById()`, `createItem()`, `updateItem()`, `deleteItem()` |
| `types.gen.ts`                 | Compile-time TypeScript DTOs & requests    | `Item`, `CreateItemRequest`, `ItemListResponse`, `GetItemsData`               |
| `schemas.gen.ts`               | Raw OpenAPI JSON schema definitions        | `ItemSchema`, `CreateItemRequestSchema`                                       |
| `zod.gen.ts`                   | Runtime Zod validation schemas             | `zItem`, `zCreateItemRequest`, `zUpdateItemRequest`, `zItemListResponse`      |
| `@tanstack/react-query.gen.ts` | Type-safe TanStack Query v5 options & keys | `getItemsOptions()`, `getItemsQueryKey()`, `createItemMutation()`             |
| `client.gen.ts`                | Configurable base client instance          | `client`                                                                      |

### Using Generated Zod Schemas (`zod.gen.ts`)

The `zod` plugin generates runtime Zod schemas matching every OpenAPI model and operation request/response. You can import them directly from `@/lib/api/client` or `@/lib/api/generated/zod.gen`:

```ts
import { zCreateItemRequest, type CreateItemRequest } from "@/lib/api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Use directly with React Hook Form
const form = useForm<CreateItemRequest>({
  resolver: zodResolver(zCreateItemRequest),
  defaultValues: {
    name: "",
    category: "general",
    amount: 0,
    status: "active",
  },
});

// Or validate external data safely at runtime
const result = zCreateItemRequest.safeParse(untrustedData);
if (!result.success) {
  console.error(result.error.flatten());
}
```

### Using Generated TanStack React Query Options (`@tanstack/react-query.gen.ts`)

The `@tanstack/react-query` plugin generates standard TanStack Query v5 `queryOptions`, `infiniteQueryOptions`, and mutation helpers:

```ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemsOptions, getItemsQueryKey, createItemMutation } from "@/lib/api/client";

// In your feature component or custom hook:
export function useItemsList(page = 1, limit = 10) {
  return useQuery(
    getItemsOptions({
      query: { page, limit },
    })
  );
}

// In a mutation hook:
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createItemMutation(),
    onSuccess: () => {
      // Invalidate using generated query key
      queryClient.invalidateQueries({
        queryKey: getItemsQueryKey(),
      });
    },
  });
}
```

> **Note:** Feature code can use either the generated `@tanstack/react-query` options or feature-colocated query key factories (`src/features/<feature>/queries/<feature>.keys.ts`) depending on customization requirements.

---

## 4. Client & Server API Configuration

The base fetch client is configured centrally in `src/lib/api/client.ts` and `src/lib/api/server.ts`:

- `src/lib/api/client.ts`: Configures the browser HTTP client with the public base URL (`NEXT_PUBLIC_APP_URL/api`), request headers, client-side authentication tokens, and re-exports SDK, types, Zod schemas, and TanStack Query options.
- `src/lib/api/server.ts`: Configures server-side HTTP calls inside Server Components, Route Handlers, or Server Actions with server-only headers (`API_SECRET`, authorization cookies).

Features **never** configure their own raw HTTP fetch clients; they consume generated SDK operations through feature query wrappers.

---

## 5. Query Key Factories

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

## 6. Explicit Developer Commands

### API Codegen

The starter supports generating directly from a local file, a remote URL, or environment variables:

```bash
# 1. Default: reads OPENAPI_SPEC_URL, OPENAPI_SPEC_PATH, or ./openapi/spec.json
pnpm api:generate

# 2. Provide a remote HTTP/HTTPS URL directly
pnpm api:generate https://api.example.com/openapi.json

# 3. Provide a custom local file path directly
pnpm api:generate ./custom-spec.json

# 4. Fetch remote spec AND save/sync a copy to ./openapi/spec.json for offline team use
pnpm api:generate --save https://api.example.com/openapi.json
```

#### Environment Variables in `.env.local`:

```env
# Point to a remote backend URL:
OPENAPI_SPEC_URL=http://localhost:3001/openapi.json

# Or point to an alternative local spec:
OPENAPI_SPEC_PATH=./specs/v1.json

# Or generic spec locator:
OPENAPI_SPEC=https://api.example.com/openapi.json
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

## 7. Strict Rules & Golden Directives

- ⚠️ **NEVER manually edit `src/lib/api/generated/`**: Any file in this folder is generated and disposable. Manual changes will be overwritten or cause CI to fail.
- ⚠️ **Do not run `api:generate` implicitly**: API generation must never run silently inside `pnpm lint` or `pnpm test`. It is an intentional, explicit developer action.
- ⚠️ **Never expose internal backend credentials**: Store backend URLs and secrets in server-only environment variables (`API_URL`, `OPENAPI_SPEC_URL`).
