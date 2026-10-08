# Tony Next.js Application Starter

[![Use this template](https://img.shields.io/badge/GitHub-Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/tonyrex99/tony-next-starter/generate)
[![CI Pipeline](https://img.shields.io/badge/CI-Passing-brightgreen?style=flat-square)](https://github.com/tonyrex99/tony-next-starter/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![HeroUI](https://img.shields.io/badge/HeroUI-v3-000000?style=flat-square)](https://heroui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A production-ready, general-purpose Next.js GitHub starter template designed for scalable SaaS platforms, dashboards, internal tools, and complex web applications.

Built with a **hybrid feature-oriented architecture**, strict separation of server state from client/UI state, contract-first API code generation, and a complete developer workflow from day one.

---

## 1. Quickstart (Using as a Template)

### Step 1: Create Your Repository

Click the green **[Use this template](https://github.com/tonyrex99/tony-next-starter/generate)** button at the top of this repository (or clone it directly).

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Run the Template Setup Wizard

Run the interactive setup wizard to configure your project name, metadata, environment variables, and choose whether to keep or purge the reference example feature:

```bash
pnpm setup
```

The wizard will interactively ask:

1. **Project name** (kebab-case)
2. **Display title** (e.g., "My SaaS Dashboard")
3. **Short description**
4. **Author name**
5. **Keep or purge reference example feature?** (Allows keeping `src/features/example` as a living guide or removing it for a clean slate)
6. **Re-initialize Git history?** (Optionally starts a fresh Git history for your new repository)

> **Headless / CI Alternative**: You can also run non-interactively:
>
> ```bash
> pnpm setup --name my-app --clean-example --yes
> # Or to simply purge the example feature at any time:
> pnpm template:clean
> ```

### Step 4: Generate API Client & Start Developing

```bash
pnpm api:generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your new application.

---

## 2. Core Technology Stack

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

## 3. Requirements

- **Node.js**: `v20.12.0` or higher (`v22+` recommended)
- **pnpm**: `v9+` or `v10+`

---

## 4. Developer Commands

### Template Setup & Scaffolding

```bash
pnpm setup           # Run interactive setup wizard (configure name, metadata, env, purge example)
pnpm template:clean  # Purge the example feature headlessly for a bare architecture slate
```

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

---

## 7. Enabling GitHub Template Repository

To enable the green **"Use this template"** button on GitHub for this repository:

1. Navigate to the repository page on GitHub: [https://github.com/tonyrex99/tony-next-starter](https://github.com/tonyrex99/tony-next-starter).
2. Go to **Settings** -> **General**.
3. Under the **Repository name** section, check the box:
   - `☑ Template repository` ("Whether this repository is a template. Templates let users generate new repositories with the same directory structure and files.")
4. Click save if prompted.

Now anyone with access can generate a fresh repository with one click!
