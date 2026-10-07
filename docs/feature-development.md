# Feature Development Guide

This guide walks through the process of creating a new domain feature in the application starter using the feature-oriented architectural pattern.

---

## 1. Directory Structure of a Feature

A fully fleshed-out feature (e.g. `customers`) looks like this:

```text
src/features/customers/
├── components/
│   ├── customers-view.tsx       # Top-level composition view
│   ├── customer-table.tsx       # Domain table with TanStack Table
│   ├── customer-table.stories.tsx
│   ├── customer-filters.tsx     # Filter toolbar bound to URL state
│   ├── customer-form.tsx        # React Hook Form + Zod form
│   ├── customer-form.stories.tsx
│   └── customer-dialog.tsx      # Modal / drawer wrapper
│
├── queries/
│   ├── customer.keys.ts         # Query key factory
│   ├── customer.queries.ts      # TanStack Query read hooks
│   └── customer.mutations.ts    # TanStack Query write hooks
│
├── schemas/
│   ├── customer.schema.ts       # Zod schema definitions
│   └── customer.schema.test.ts  # Schema validation unit tests
│
├── stores/                      # ONLY if shared client-only state is needed
│   └── customer-ui.store.ts     # Feature-local Zustand store
│
├── hooks/                       # Domain-specific React hooks
│   └── use-customer-filters.ts  # nuqs URL filter hook
│
├── mocks/                       # Mock data and MSW network handlers
│   ├── data.ts
│   └── handlers.ts
│
├── utils/                       # Pure domain utility functions
│   ├── customer.utils.ts
│   └── customer.utils.test.ts
│
└── types.ts                     # Feature-specific domain types & re-exports
```

---

## 2. When NOT to Create Directories

Do **not** create empty placeholder directories! Only add a folder when the feature genuinely requires it:

- **No `stores/`**: If the feature only uses URL state (`nuqs`) and component state (`useState`), do NOT create a Zustand store. Most features do not need a store.
- **No `utils/`**: If there are no complex domain calculations, currency conversions, or custom formatting, omit `utils/`.
- **No `hooks/`**: If standard query hooks and basic React hooks suffice, do not create a separate `hooks/` directory.

---

## 3. Step-by-Step Implementation Workflow

### Step 1: Define Schemas & Types

Start with the domain contracts and validation rules:

```ts
// src/features/customers/schemas/customer.schema.ts
import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).default("ACTIVE"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
```

### Step 2: Set Up Query Keys & Fetchers

Define the query-key factory and queries:

```ts
// src/features/customers/queries/customer.keys.ts
export const customerKeys = {
  all: () => ["customers"] as const,
  lists: () => [...customerKeys.all(), "list"] as const,
  list: (filters?: Record<string, unknown>) => [...customerKeys.lists(), filters ?? {}] as const,
  detail: (id: string) => [...customerKeys.all(), "detail", id] as const,
};
```

### Step 3: Implement Leaf Components

Create the interactive form and table components. Keep client boundaries small by placing `"use client"` directly in the leaf components.

### Step 4: Assemble the View Component

Create `customers-view.tsx` to orchestrate sub-components:

```tsx
// src/features/customers/components/customers-view.tsx
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { CustomerFilters } from "./customer-filters";
import { CustomerTable } from "./customer-table";
import { CustomerDialog } from "./customer-dialog";

export function CustomersView() {
  return (
    <PageContainer>
      <PageHeader title="Customers" description="Manage your customer accounts." />
      <CustomerFilters />
      <CustomerTable />
      <CustomerDialog />
    </PageContainer>
  );
}
```

### Step 5: Mount in Next.js App Router

Create a thin page route inside `src/app/`:

```tsx
// src/app/(dashboard)/customers/page.tsx
import { CustomersView } from "@/features/customers/components/customers-view";

export const metadata = { title: "Customers | Dashboard" };

export default function CustomersPage() {
  return <CustomersView />;
}
```

### Step 6: Add Tests & Storybook Stories

1. Write schema and utility unit tests (`*.test.ts`) using Vitest.
2. Create component stories (`*.stories.tsx`) covering Loading, Empty, Filled, and Error states.
3. If this is a critical business path, add an end-to-end test in `e2e/`.
