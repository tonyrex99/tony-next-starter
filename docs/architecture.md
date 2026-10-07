# Architecture Guide

This document outlines the architectural philosophy and structural foundations of the application starter.

---

## 1. Core Architectural Mental Model

The repository is built around a hybrid pattern:

> **Feature-Oriented Architecture + Reusable UI Primitives**

Instead of grouping code purely by technical layer (e.g. putting all tables in one global folder, all forms in another), code is organized primarily by **ownership**.

```text
src/
├── app/                  # Next.js App Router (thin routes, layouts, boundaries)
├── components/           # Generic & cross-feature UI building blocks
│   ├── ui/               # Reusable primitive wrappers (Button, Input, DataTable)
│   ├── layout/           # Application shell, navigation, header, sidebar
│   └── shared/           # Components genuinely shared across multiple features
├── features/             # Business domain feature modules
│   └── example/          # Domain-specific components, queries, schemas, stores
├── lib/                  # Infrastructure, utilities, API clients, authentication
├── hooks/                # Generic, application-wide React utility hooks
├── stores/               # Minimal application-wide client stores (rare)
├── providers/            # React context providers composition
├── config/               # Validated env & compile-time application settings
└── types/                # Global TypeScript declarations
```

---

## 2. Next.js App Router & Server Components

### Server Components by Default

React Server Components (RSC) are the default rendering paradigm throughout `src/app/`. Server Components offer significant benefits:

- Zero client bundle size for data fetchers and heavy markdown/rendering utilities.
- Direct secure access to server resources and backend microservices.
- Automatic streaming via `Suspense` and built-in error/loading boundaries (`loading.tsx`, `error.tsx`).

### Boundary Rule: Minimal Leaf Interactivity

Do **NOT** add `"use client"` at the top of a route or layout page simply because a single interactive button or modal is required. Push client boundaries as deep down the component tree as reasonably possible:

```text
ExamplePage (Server Component)
│
└── ExampleView (Server Component)
    │
    ├── ExampleStats (Server Component)
    ├── ExampleFilters (Client Component - URL state & inputs)
    ├── ExampleTable (Client Component - interactive TanStack Table)
    └── ExampleDialog (Client Component - modal & form validation)
```

### Thin Pages

Route files inside `src/app/` are thin orchestrators. They handle:

- URL parameter parsing (`params`, `searchParams`)
- Route-level metadata definitions (`export const metadata`)
- High-level layout composition

They do **not** contain hundreds of lines of inline UI. Route pages delegate directly to feature view components:

```tsx
// src/app/(dashboard)/example/page.tsx
import { ExampleView } from "@/features/example/components/example-view";

export default function ExamplePage() {
  return <ExampleView />;
}
```

---

## 3. Component Ownership & Taxonomy

To avoid premature abstraction and unnecessary cognitive load, code lives at the **narrowest scope that can reasonably own it**:

| Category               | Location                             | Purpose & Rules                                                                                                                             |
| :--------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **UI Primitives**      | `src/components/ui/`                 | Headless/HeroUI wrappers designed for general reuse (e.g. `button.tsx`, `data-table.tsx`, `modal.tsx`). Must NEVER import from `features/`. |
| **Application Layout** | `src/components/layout/`             | Structural shells such as `navbar.tsx`, `sidebar.tsx`, and `app-shell.tsx`.                                                                 |
| **Shared Primitives**  | `src/components/shared/`             | Composed UI elements used across at least two distinct feature domains (e.g. `status-badge.tsx`, `money-display.tsx`, `user-avatar.tsx`).   |
| **Feature Domain**     | `src/features/<feature>/components/` | Domain-specific components (e.g. `customer-table.tsx`, `order-form.tsx`).                                                                   |

---

## 4. Why Strict Atomic Design Is NOT Used

Strict Atomic Design forces developers to classify every component into rigid, arbitrary buckets:

- `atoms/`
- `molecules/`
- `organisms/`
- `templates/`
- `pages/`

In practice, teams waste significant time debating whether a search input with a clear button is an "atom" or a "molecule", or whether a card containing a badge is a "molecule" or an "organism". Furthermore, Atomic Design completely ignores domain boundaries.

In this starter:

- **Ownership takes precedence over taxonomy**.
- The primary question is always: _"Which feature owns this component?"_
- A component is either primitive UI (`components/ui`), layout (`components/layout`), shared cross-domain UI (`components/shared`), or owned by a feature (`features/<name>/`).

---

## 5. Why There Is No Mandatory Global `views/` Directory

A global `views/` folder creates unnecessary distance between a feature and its presentation layer.

Instead:

- The top-level composition component for a feature lives inside that feature: `src/features/<feature>/components/<feature>-view.tsx`.
- All sub-components, queries, schemas, and tests remain colocated.
- A future global `views/` folder may only be introduced if a multi-tenant or multi-layout composition layer genuinely requires it.

---

## 6. Dependency Direction Rules

Code dependencies must flow in a clean, unidirectional hierarchy:

```text
src/app/ (Routes & Pages)
   │
   ▼
src/features/ (Domain Features)
   │
   ├────────────────────────┐
   ▼                        ▼
src/components/ui/     src/lib/ (API, auth, utils)
src/components/shared/
```

### Strict Rules:

1. `components/ui` and `components/layout` **must never** import from `features/`.
2. Features may import from `components/ui`, `components/shared`, `lib/`, `hooks/`, and their own internal modules.
3. Feature-to-feature cross-imports should be minimized. If two features need identical business logic or DTO transformations, extract the shared concern into `lib/` or promote the shared component to `components/shared/`.
