# AGENTS.md

> Operational rules, architectural boundaries, and guidelines for AI coding agents (Gemini, Claude, GPT, Cursor, etc.) working in this repository.

---

## 1. Core Architectural Mental Model

1. **Feature-Oriented Ownership**:
   - Features own their domain frontend logic: `src/features/<feature-name>/`.
   - Reusable visual wrappers live in `src/components/ui/`.
   - Layout shells live in `src/components/layout/`.
   - Generic multi-feature components live in `src/components/shared/` only after proven reuse.
   - Do NOT introduce strict Atomic Design directory structures (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`).
   - Do NOT introduce a mandatory global `views/` directory. Page views live inside their respective feature (e.g. `src/features/example/components/example-view.tsx`).

2. **Next.js App Router & Server Components**:
   - **Server Components by default**: Every page and layout in `src/app/` is a Server Component unless interactive browser APIs are required.
   - **Thin Pages**: Route files (e.g., `src/app/(dashboard)/example/page.tsx`) must only compose the feature view and handle route-level data fetching/metadata.
   - **Small Client Boundaries**: Push `"use client"` down to the interactive leaf nodes (forms, dialogs, interactive tables, filter bars). Never convert an entire view or page into a Client Component because a child button or modal is interactive.
   - Do not pass non-serializable objects or functions (such as component definitions `as={Link}`) across Server-to-Client boundaries.

---

## 2. State Classification Decision Tree

Always classify application state into one of five categories:

```text
Does the state originate from a backend API?
  ├── YES ──> Server State: TanStack Query (or React Server Components)
  └── NO
        ├── Should the state be linkable, bookmarkable, or persist in URL?
        │     └── YES ──> URL State: nuqs
        └── NO
              ├── Is the state isolated to a single component or parent/child?
              │     └── YES ──> Component State: useState / useReducer
              └── NO
                    ├── Does the state belong exclusively to one feature?
                    │     └── YES ──> Feature Client Store: src/features/<feature>/stores/
                    └── NO  ──> Global Client Store: src/stores/ (must be rare)
```

- **Never copy server data into Zustand**: Do not create stores containing entities like `items: Item[]` or `users: User[]`. Use TanStack Query cache.
- **URL state**: Use `nuqs` for search queries, active tab, pagination, and filter toggles.

---

## 3. API Contract & Codegen Rules

1. **Single Source of Truth**: The OpenAPI specification is resolved dynamically from CLI arguments (`pnpm api:generate <url-or-path>`), `OPENAPI_SPEC_URL`, `OPENAPI_SPEC_PATH`, `OPENAPI_SPEC`, or `./openapi/spec.json`.
2. **Disposable Generated Code**: Hey API produces `src/lib/api/generated/` including `sdk.gen.ts`, `types.gen.ts`, runtime schemas in `zod.gen.ts`, and query/mutation options in `@tanstack/react-query.gen.ts`. Re-exported from `@/lib/api/client`.
3. **NEVER Manually Edit Generated Files**: Any file inside `src/lib/api/generated/` is strictly generated. Manual edits will be rejected by `pnpm api:check`.
4. **Colocated Query Key Factories**:
   - Every feature using custom query keys can define a colocated query-key factory in `src/features/<feature>/queries/<feature>.keys.ts` or leverage the generated `@tanstack/react-query` query options.
   - Do NOT create global query key files like `src/lib/query-keys.ts`.
5. **Regeneration Workflow**: Run `pnpm api:generate` (supports direct URLs or `--save <url>`). Check freshness using `pnpm api:check`.

---

## 4. UI Library & Styling

1. **HeroUI + Tailwind CSS v4**:
   - HeroUI (`@heroui/react` v3) is the primary component foundation.
   - Tailwind CSS v4 is used for layout, responsive positioning, grid systems, and custom micro-styling.
   - Do NOT install or introduce competing design systems or UI libraries (no Chakra, Mantine, MUI, AntD, or shadcn/ui duplicate primitives).
2. **Encapsulated UI Primitives**:
   - Wrap raw HeroUI controls inside `src/components/ui/` to guarantee standard styling, accessibility, and uniform APIs across the application.

---

## 5. Forms & Validation

- Use **React Hook Form** paired with **Zod** (`@hookform/resolvers/zod`).
- Schemas must live in `src/features/<feature>/schemas/<feature>.schema.ts`.
- Derive TypeScript types directly from Zod schemas: `type FormInput = z.infer<typeof schema>`.
- Do not duplicate validation logic between components and schemas.

---

## 6. Testing Expectations

1. **Vitest**: Unit testing for schemas, utilities, state stores, and query keys. Colocated in feature folders (e.g., `<name>.test.ts`).
2. **React Testing Library & user-event**: Component behavior testing. Query by role, label, or text. Do not test internal implementation state.
3. **MSW (Mock Service Worker)**: API network mocking for component tests and Storybook. Handlers colocate in `src/features/<feature>/mocks/`.
4. **Storybook**: Isolated UI state development. Stories live next to components (`<name>.stories.tsx`). Document Default, Loading, Empty, and Error states.
5. **Playwright**: End-to-end tests in `e2e/`. Focus strictly on critical user journeys (authentication, core navigation, essential CRUD).

---

## 7. Forbidden Patterns & Strict Anti-Patterns

- ❌ **DO NOT** create global entity stores in Zustand (`usersStore`, `ordersStore`).
- ❌ **DO NOT** put feature-specific components into `src/components/ui/` or `src/components/shared/`.
- ❌ **DO NOT** manually modify any file inside `src/lib/api/generated/`.
- ❌ **DO NOT** use `any` as an escape hatch in TypeScript.
- ❌ **DO NOT** add `"use client"` at the top of pages or layouts unless strictly unavoidable.
- ❌ **DO NOT** expose private tokens or secrets via `NEXT_PUBLIC_*` environment variables.
- ❌ **DO NOT** create strict Atomic Design taxonomy folders (`atoms/`, `molecules/`, `organisms/`).
- ❌ **DO NOT** build abstract global CRUD generators before clear duplication exists.
- ❌ **DO NOT** run API codegen automatically inside test or lint commands.
- ❌ **DO NOT** commit without checking formatting, linting, type safety, and tests.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
