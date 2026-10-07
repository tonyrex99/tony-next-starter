# UI System & Styling Architecture

This document describes the user interface foundations, styling conventions, component encapsulation, and accessibility standards.

---

## 1. Technology Choices: HeroUI + Tailwind CSS v4

The UI foundation is composed of:

1. **HeroUI (`@heroui/react` v3)**: Provides accessible, composable component primitives built on top of React Aria Components (`react-aria-components`).
2. **Tailwind CSS v4 (`@tailwindcss/postcss`)**: Provides high-performance utility-first styling, grid layouts, responsive positioning, and dark mode theming without legacy configuration bloat.

### Strict Rule: Single Design System

Do **NOT** install secondary UI libraries such as:

- Material UI (MUI)
- Ant Design
- Chakra UI
- Mantine
- shadcn/ui duplicate primitives

Having competing UI systems degrades page load speed, fragments accessibility behavior, creates conflicting CSS specificity battles, and increases bundle size.

---

## 2. Encapsulated UI Primitives (`src/components/ui/`)

Direct raw component imports from external libraries across hundreds of feature files can lead to severe lock-in and high refactoring cost whenever upstream APIs evolve.

To prevent this, the starter encapsulates primary controls into standardized, reusable primitives in `src/components/ui/`:

- `button.tsx`: Unified button wrapper supporting variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `flat`), sizes, loading states, and start/end icons.
- `input.tsx`: Text input with built-in label, helper text, error message, clearable toggle, and accessibility aria attributes.
- `select.tsx`: Select dropdown with option lists and validation states.
- `textarea.tsx`: Multi-line text field with character count and validation states.
- `modal.tsx` & `drawer.tsx`: Accessible dialog overlays with headers, footers, and focus management.
- `confirm-dialog.tsx`: Pre-built confirmation alert modal with destructive variant handling.
- `data-table.tsx`: Composable table combining TanStack Table behavior with clean visual aesthetics.
- `empty-state.tsx` & `loading-state.tsx`: Standard UX fallback containers.
- `page-container.tsx` & `page-header.tsx`: Standard page layout wrappers with breadcrumbs and action button slots.

Features should import from `@/components/ui/*` rather than directly importing raw external library primitives.

---

## 3. Tailwind CSS v4 Structure

In Tailwind CSS v4, styling is declared directly in CSS rather than requiring a complex `tailwind.config.js`:

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "@heroui/styles";

@layer base {
  body {
    @apply bg-background text-foreground antialiased min-h-screen;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }
}
```

Theme tokens like `bg-background`, `text-foreground`, `bg-content1`, and `border-default-200` automatically adapt to light and dark modes via CSS variables.

---

## 4. Accessibility (a11y) & Semantic Markup

All UI primitives adhere to WCAG 2.1 AA accessibility guidelines:

- **Keyboard Navigation**: Modals, dropdowns, and buttons support standard keyboard traps, Escape dismissal, and arrow key traversal out of the box through React Aria.
- **Accessible Forms**: Inputs automatically link their `label`, `error`, and `description` elements via `id` and `aria-describedby` attributes.
- **Focus Rings**: Interactive controls maintain visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).
- **Semantic Structure**: Every page utilizes semantic tags (`<header>`, `<main>`, `<nav>`, `<aside>`) with an `<h1>` tag at the top of each view.

---

## 5. Responsive Design Standards

Adopt a mobile-first responsive strategy using Tailwind breakpoints:

- `sm`: 640px (large phones, small tablets)
- `md`: 768px (tablets, small laptops)
- `lg`: 1024px (desktops)
- `xl`: 1280px (wide desktop screens)

The starter includes:

- Desktop collapsible sidebar (`src/components/layout/sidebar.tsx`).
- Mobile sliding drawer navigation (`src/components/layout/mobile-navigation.tsx`).
- Responsive tables with horizontal scrolling containers and flexible grid cards.
