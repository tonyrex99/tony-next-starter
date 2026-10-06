import type { Item } from "../types";

export function calculateTotalValue(items: Item[]): number {
  return items.reduce((total, item) => total + (item.amount || 0), 0);
}

export function countByStatus(items: Item[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    const status = item.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
}
