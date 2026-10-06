import { describe, expect, it } from "vitest";
import { calculateTotalValue, countByStatus } from "./example.utils";
import type { Item } from "../types";

const mockItems: Item[] = [
  {
    id: "1",
    name: "Item 1",
    category: "Gadgets",
    amount: 100,
    status: "active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Item 2",
    category: "Tools",
    amount: 250,
    status: "active",
    createdAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Item 3",
    category: "Tools",
    amount: 50,
    status: "archived",
    createdAt: "2026-01-03T00:00:00Z",
  },
];

describe("example.utils", () => {
  it("calculates total sum of amounts correctly", () => {
    expect(calculateTotalValue(mockItems)).toBe(400);
  });

  it("handles empty arrays gracefully", () => {
    expect(calculateTotalValue([])).toBe(0);
  });

  it("groups counts by status correctly", () => {
    const counts = countByStatus(mockItems);
    expect(counts.active).toBe(2);
    expect(counts.archived).toBe(1);
    expect(counts.inactive).toBeUndefined();
  });
});
