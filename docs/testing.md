# Testing Strategy & Guidelines

Testing is a first-class citizen in this starter. The testing strategy employs four complementary levels to achieve high confidence without excessive test maintenance burden.

---

## 1. Testing Pyramid Overview

```text
       ▲
      / \        E2E Tests (Playwright)
     /   \       Critical user journeys (auth, navigation, core CRUD)
    /─────\
   /       \     Storybook + MSW
  /         \    Isolated UI states (Loading, Empty, Error, Filled)
 /───────────\
/             \   Component Tests (React Testing Library)
/               \  Interactive behaviors, form validation, clicks
/─────────────────\
/                   \ Unit Tests (Vitest)
/                     \ Pure functions, schemas, stores, utils, query-keys
───────────────────────
```

---

## 2. Test Placement & Colocation

Tests are colocated directly alongside the code they test:

```text
src/features/example/
├── schemas/
│   ├── example.schema.ts
│   └── example.schema.test.ts      # Vitest unit test
├── utils/
│   ├── example.utils.ts
│   └── example.utils.test.ts       # Vitest unit test
└── components/
    ├── example-form.tsx
    ├── example-form.stories.tsx    # Storybook visual states
    └── ...

tests/
├── setup.ts                        # Global test environment setup (jest-dom, mock matchMedia)
└── unit/
    ├── app-store.test.ts           # Global store tests
    └── example-component.test.tsx  # RTL component test

e2e/
├── example.spec.ts                 # Playwright end-to-end tests
└── fixtures/                       # E2E test data & fixtures
```

---

## 3. Unit & Component Testing: Vitest + React Testing Library

### Fast Vitest Execution

Vitest runs directly with Vite-based ESM speed, sharing path aliases (`@/*`) defined in `tsconfig.json`.

```bash
# Run unit and component tests once
pnpm test

# Run tests in interactive watch mode
pnpm test:watch

# Generate code coverage report
pnpm test:coverage
```

### React Testing Library Philosophy

- **Test user-observable behavior**, not internal React implementation details.
- Query elements using accessibility roles (`getByRole("button", { name: "Submit" })`), label text (`getByLabelText("Email")`), or placeholder text.
- Use `@testing-library/user-event` for user simulations (typing, clicking, pressing Enter).

---

## 4. API Mocking with MSW (Mock Service Worker)

Mock Service Worker intercepts network requests at the HTTP transport layer:

- No ad-hoc monkey-patching of `global.fetch`.
- The exact same MSW handlers are reused across Vitest tests, Storybook stories, and local offline development.
- Mock handlers live inside the feature directory: `src/features/<feature>/mocks/handlers.ts`.

---

## 5. End-to-End Testing with Playwright

Playwright tests critical production paths in real browser environments:

- Navigation and authentication flows.
- Multi-step wizards and complete form submissions.
- Routing guards and permissions.

```bash
# Run E2E tests headless
pnpm test:e2e

# Run with interactive Playwright UI
pnpm test:e2e:ui

# Run headed in a visible browser window
pnpm test:e2e:headed
```

Configuration in `playwright.config.ts` automatically boots the local Next.js server (`pnpm build && pnpm start` or `pnpm dev`) if not already running.

---

## 6. What Should and Should NOT Be Tested

### ✅ DO Test:

- Complex business logic and utility functions.
- Zod schema validation rules and edge case inputs.
- Critical user interactions (submitting forms, deleting records, filtering tables).
- Edge UI states (loading skeletons, empty states, error banners).
- Core user journeys in E2E (sign-in, dashboard navigation, critical CRUD).

### ❌ DO NOT Test:

- Third-party library internal behavior (do not test if React or HeroUI functions).
- Static styling details (e.g. asserting whether an element has `className="flex"`).
- Ephemeral internal component state variables.
- Aiming for arbitrary 100% code coverage targets that incentivize brittle tests.
