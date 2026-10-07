# State Management Guide

A clear understanding of state categories is critical for maintaining high performance, avoiding memory leaks, and keeping the codebase maintainable as the application scales.

---

## 1. The Five State Categories

Every piece of application state falls into exactly one of the following five categories:

```text
┌───────────────────────────┬───────────────────────────────┬──────────────────────────────────┐
│ Category                  │ Mechanism                     │ Example Use Cases                │
├───────────────────────────┼───────────────────────────────┼──────────────────────────────────┤
│ 1. Server State           │ TanStack Query / RSC          │ API entity lists, profile data   │
│ 2. URL State              │ nuqs (URL search parameters)  │ Pagination, search, sort, filter │
│ 3. Component State        │ useState / useReducer         │ Dropdown open/close, hovered row │
│ 4. Feature Client State   │ Feature Zustand Store         │ Multi-step wizard inside feature │
│ 5. Global Client State    │ Global Zustand Store          │ Sidebar collapsed, active theme  │
└───────────────────────────┴───────────────────────────────┴──────────────────────────────────┘
```

---

## 2. Decision Tree

When introducing new state, follow this decision flowchart:

```text
Does the state originate from a backend API or server?
  │
 ├── YES ──> Server State: TanStack Query (Client) or React Server Component (Server)
 │
 └── NO
       │
       Does the state need to be shareable, bookmarkable, or preserved on reload?
         │
        ├── YES ──> URL State: nuqs (search params)
        │
        └── NO
              │
              Is the state scoped to a single component or tight parent-child tree?
                │
               ├── YES ──> Component State: useState() / useReducer()
               │
               └── NO
                     │
                     Is the state used exclusively within a single feature?
                       │
                      ├── YES ──> Feature Zustand Store (src/features/<feature>/stores/)
                      │
                      └── NO  ──> Global Zustand Store (src/stores/) [Keep rare]
```

---

## 3. Server State vs. Client State

### The Anti-Pattern: Copying Server State into Zustand

A common architectural trap in frontend applications is duplicating API responses into global client stores:

```ts
// ❌ WRONG: Do NOT do this
interface CustomerStore {
  customers: Customer[]; // Server state improperly stored in client store
  fetchCustomers: () => Promise<void>;
}
```

### Why This Is Harmful:

1. **Cache Stale-ness**: Zustand does not automatically handle background refetching, window refocus revalidation, request deduplication, cache expiration (`staleTime`), or optimistic mutation rollback.
2. **Synchronization Bugs**: You are forced to manually maintain loading, error, success, and cache synchronization flags across dozens of UI screens.
3. **Memory Leaks**: Global store arrays retain obsolete API records indefinitely unless manually cleared.

### The Correct Pattern: TanStack Query

```tsx
// ✅ CORRECT: TanStack Query manages caching, deduplication, and synchronization
import { useQuery } from "@tanstack/react-query";
import { exampleKeys } from "../queries/example.keys";
import { fetchExampleItems } from "../queries/example.queries";

export function useExampleItems(filters: ExampleFilters) {
  return useQuery({
    queryKey: exampleKeys.list(filters),
    queryFn: () => fetchExampleItems(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

---

## 4. URL State with `nuqs`

State that influences what data is displayed should generally live in the URL:

- Search terms
- Table page numbers and page sizes
- Filter dropdowns and status checkboxes
- Active navigation tabs

### Benefits of `nuqs`:

- Users can bookmark specific search results and share links directly with teammates.
- Native browser Back / Forward history works seamlessly.
- State persists across page refreshes without requiring `localStorage` synchronization.

### Example:

```tsx
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

export function useExampleFilters() {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [status, setStatus] = useQueryState("status", parseAsString.withDefault("ALL"));

  return { search, setSearch, page, setPage, status, setStatus };
}
```

---

## 5. Zustand Client Stores

Zustand is reserved strictly for non-server client state:

- UI toggles shared across multiple distant components (e.g. drawer open state triggered from a header button).
- Ephemeral client wizard data before final API submission.
- Global app preferences (e.g., collapsed sidebar, theme overrides).

### Scope Principle:

- **Feature Stores**: Keep them inside the feature directory: `src/features/<feature>/stores/<feature>-ui.store.ts`.
- **Global Stores**: Placed in `src/stores/app.store.ts`. Global stores should remain rare and lightweight.
