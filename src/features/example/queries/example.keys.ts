import type { ItemFilters } from "../types";

export const exampleKeys = {
  all: () => ["items"] as const,
  lists: () => [...exampleKeys.all(), "list"] as const,
  list: (filters: Partial<ItemFilters>) => [...exampleKeys.lists(), filters] as const,
  details: () => [...exampleKeys.all(), "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};
