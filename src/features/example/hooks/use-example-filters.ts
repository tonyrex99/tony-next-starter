"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export function useExampleFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false, throttleMs: 300 })
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
  };

  return {
    search,
    setSearch,
    status: status as "active" | "inactive" | "archived" | "",
    setStatus,
    page,
    setPage,
    resetFilters,
  };
}
