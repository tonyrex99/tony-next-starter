# Tony Next.js Application Starter

A production-ready, general-purpose Next.js starter template designed for scalable SaaS platforms, dashboards, internal tools, and complex web applications.

Built with a **hybrid feature-oriented architecture**, strict separation of server state from client/UI state, contract-first API code generation, and a complete developer workflow from day one.

---

## 1. Core Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components by default)
- **Runtime & UI**: [React 19](https://react.dev/), [HeroUI v3](https://heroui.com/) (`@heroui/react`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Server State & Cache**: [TanStack Query v5](https://tanstack.com/query)
- **Client State**: [Zustand v5](https://zustand.docs.pmnd.rs/) (feature-scoped & minimal global)
- **URL State**: [nuqs v2](https://nuqs.47ng.com/)
- **Data Tables**: [TanStack Table v8](https://tanstack.com/table)
- **Forms & Validation**: [React Hook Form v7](https://react-hook-form.com/) + [Zod v3](https://zod.dev/)
- **API Contract & Client**: [Hey API](https://heyapi.dev/) (`@hey-api/openapi-ts` with TypeScript SDK, Zod runtime schemas, and TanStack React Query v5 plugins)
- **Icons & Animation**: [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Component Workbench**: [Storybook 8](https://storybook.js.org/) (`@storybook/react-vite`)
- **Network Interception**: [MSW v2](https://mswjs.io/) (Mock Service Worker)
- **Unit & Component Testing**: [Vitest v3](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **End-to-End Testing**: [Playwright](https://playwright.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 2. Requirements

- **Node.js**: `v20.12.0` or higher (`v22+` recommended)
- **pnpm**: `v9+` or `v10+`

---

## 3. Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file and customize values:

```bash
cp .env.example .env.local
```

### 3. Generate API Client

Generate the TypeScript client SDK, Zod schemas, and TanStack Query options from the OpenAPI specification:

```bash
pnpm api:generate
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 4. Developer Commands

### Development & Build

```bash
pnpm dev             # Start Next.js development server
pnpm build           # Build production Next.js bundle
pnpm start           # Serve production build locally
```

### Formatting & Linting

```bash
pnpm format          # Format files with Prettier
pnpm format:check    # Verify formatting without modifying files (CI)
pnpm lint            # Run ESLint check
pnpm lint:fix        # Auto-fix linting issues
pnpm typecheck       # Run strict TypeScript compiler check (noEmit)
```

### API Codegen & Freshness Verification

```bash
pnpm api:generate                           # Generate from OPENAPI_SPEC_URL, OPENAPI_SPEC_PATH, or ./openapi/spec.json
pnpm api:generate https://api.com/spec.json # Generate directly from a remote HTTP/HTTPS URL
pnpm api:generate ./custom/spec.json        # Generate directly from a custom local path
pnpm api:generate --save https://...        # Generate and save a local copy to ./openapi/spec.json
pnpm api:check                              # Verify generated code matches OpenAPI spec without modifying working tree
```

### Unit & Component Testing

```bash
pnpm test            # Run Vitest test suites
pnpm test:watch      # Run Vitest in interactive watch mode
pnpm test:coverage   # Generate test coverage report
```

### Storybook UI Workbench

```bash
pnpm storybook       # Launch Storybook server at http://localhost:6006
pnpm storybook:build # Build static Storybook bundle for deployment
```

### End-to-End Testing (Playwright)

```bash
pnpm test:e2e        # Run Playwright E2E tests headless
pnpm test:e2e:ui     # Launch interactive Playwright UI runner
pnpm test:e2e:headed # Run tests in visible browser window
```

### Full Verification & CI

```bash
pnpm verify          # Run format check, lint, typecheck, tests, and production build
pnpm ci              # Run full verification suite including E2E tests
```

---

## 5. Architectural Documentation

Deep-dive documentation is available in the [`docs/`](./docs) folder:

- [Architecture Guide](./docs/architecture.md): Feature-oriented design, RSC boundaries, and component ownership.
- [State Management](./docs/state-management.md): The five state tiers (Server, URL, Component, Feature, Global) and decision tree.
- [API Architecture & Codegen](./docs/api.md): OpenAPI integration, Hey API, and query-key factories.
- [Feature Development](./docs/feature-development.md): How to build new domain features step-by-step.
- [UI & Styling](./docs/ui.md): HeroUI, Tailwind CSS v4, component wrappers, and accessibility.
- [Testing Strategy](./docs/testing.md): Vitest, React Testing Library, MSW, and Playwright expectations.
- [Storybook](./docs/storybook.md): Isolated component development, states, and mocking.
- [Configuration & Environment](./docs/configuration.md): Validated Zod environment variables and security tiers.
- [Development Workflow](./docs/development-workflow.md): Standard developer routines, scripts, and Git discipline.

For AI coding agents (Claude, Gemini, Cursor, Codex), refer to [AGENTS.md](./AGENTS.md) for operational instructions and forbidden patterns.

---

## 6. Example Feature

The template includes a reference feature in [`src/features/example/`](./src/features/example/):

- **Server Component Page**: Thin route in `src/app/(dashboard)/example/page.tsx`
- **Feature View**: `example-view.tsx` orchestrating stats, filters, table, and dialog
- **TanStack Query + Query Key Factory**: Colocated queries and mutations
- **TanStack Table**: Filterable, paginated data grid with custom badges
- **React Hook Form + Zod**: Validated creation and edit dialog
- **URL State with `nuqs`**: Search and status query parameters synced to the browser URL
- **MSW & Storybook Stories**: Isolated mock handlers and component state stories
- **Vitest & React Testing Library**: Colocated unit tests and component tests
