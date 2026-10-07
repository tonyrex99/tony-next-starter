# Storybook Guide

Storybook provides an isolated UI development environment, allowing developers and designers to build, test, and review interface components without running the backend API or navigating through deep application flows.

---

## 1. Why Storybook Exists

Modern applications feature complex UI components with numerous edge states:

- Skeletons and loading spinners
- Empty states with zero data
- Form validation error tooltips
- Severe API server errors
- Mobile and narrow responsive viewports

Rendering each of these states in a running application often requires orchestrating specialized database seeds or hacking API responses. Storybook isolates the component and renders every state on demand.

---

## 2. Configuration (`.storybook/`)

The starter configures Storybook using `@storybook/react-vite` for instantaneous hot module reloading and build performance:

- `.storybook/main.ts`: Configures Vite plugins and TypeScript path aliases (`@/*`).
- `.storybook/preview.tsx`: Wraps every story in application providers (`HeroUIProvider`, `QueryClientProvider`, `ThemeProvider`).
- `.storybook/mocks/handlers.ts`: Supplies global MSW request handlers for API-dependent components.

---

## 3. When to Create a Story

### Create Stories For:

- All reusable UI primitives in `src/components/ui/` (`button.stories.tsx`, `modal.stories.tsx`, `data-table.stories.tsx`).
- Shared application widgets in `src/components/shared/` (`status-badge.stories.tsx`, `user-avatar.stories.tsx`).
- Complex feature components with meaningful interactive states (`example-form.stories.tsx`, `example-table.stories.tsx`).

### Do NOT Create Stories For:

- Full page routes in `src/app/` (test these via Playwright E2E).
- Pure utility functions or schemas (test these via Vitest).
- Thin layout containers that only render `children`.

---

## 4. Required Story States

When creating a story for an interactive component, document meaningful states:

```tsx
// src/features/example/components/example-table.stories.tsx
export const Populated: Story = {
  args: { data: mockItems, isLoading: false, total: 25 },
};

export const Loading: Story = {
  args: { data: [], isLoading: true, total: 0 },
};

export const Empty: Story = {
  args: { data: [], isLoading: false, total: 0 },
};

export const LargeDataset: Story = {
  args: { data: generateMockItems(100), isLoading: false, total: 100 },
};
```

---

## 5. Storybook vs. Unit Tests vs. E2E

| Tool             | Primary Purpose                                                    | Feedback Speed | Scope                   |
| :--------------- | :----------------------------------------------------------------- | :------------- | :---------------------- |
| **Storybook**    | Visual inspection, edge-state development, component documentation | Instant        | Single Component        |
| **Vitest + RTL** | Deterministic assertions on user interactions and business logic   | Milliseconds   | Single Unit / Component |
| **Playwright**   | Full stack integration, browser rendering, cross-page flows        | Seconds        | Entire Application      |

---

## 6. Developer Commands

```bash
# Start the interactive Storybook development server on port 6006
pnpm storybook

# Build static Storybook bundle for deployment or static hosting
pnpm storybook:build
```
