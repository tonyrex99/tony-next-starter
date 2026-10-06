import { queryOptions, useQuery } from "@tanstack/react-query";
import { getItems, getItemById } from "@/lib/api/client";
import { exampleKeys } from "./example.keys";
import type { ItemFilters } from "../types";

export function itemsQueryOptions(filters: Partial<ItemFilters> = {}) {
  return queryOptions({
    queryKey: exampleKeys.list(filters),
    queryFn: async () => {
      const response = await getItems({
        query: {
          page: filters.page,
          limit: filters.limit,
          search: filters.search,
          status: filters.status
            ? (filters.status as "active" | "inactive" | "archived")
            : undefined,
        },
      });

      if (response.error || !response.data) {
        throw new Error(String(response.error || "Failed to load items"));
      }

      return response.data;
    },
  });
}

export function useItemsQuery(filters: Partial<ItemFilters> = {}) {
  return useQuery(itemsQueryOptions(filters));
}

export function itemDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: exampleKeys.detail(id),
    queryFn: async () => {
      const response = await getItemById({
        path: { id },
      });

      if (response.error || !response.data) {
        throw new Error(String(response.error || "Failed to load item"));
      }

      return response.data;
    },
    enabled: Boolean(id),
  });
}

export function useItemDetailQuery(id: string) {
  return useQuery(itemDetailQueryOptions(id));
}
