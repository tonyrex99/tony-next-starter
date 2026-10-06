import type { Item } from "../types";

export const mockItemsList: Item[] = [
  {
    id: "item_1",
    name: "Enterprise Cloud Node",
    category: "Infrastructure",
    amount: 1299.99,
    status: "active",
    description: "Dedicated high-memory compute instance",
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
    id: "item_2",
    name: "Edge Gateway Router",
    category: "Networking",
    amount: 450.0,
    status: "active",
    description: "Low-latency edge routing hardware",
    createdAt: "2026-02-16T14:30:00Z",
  },
  {
    id: "item_3",
    name: "Legacy Database Archive",
    category: "Storage",
    amount: 199.5,
    status: "archived",
    description: "Cold storage backup repository",
    createdAt: "2026-01-10T08:15:00Z",
  },
  {
    id: "item_4",
    name: "Staging API Cluster",
    category: "Infrastructure",
    amount: 320.0,
    status: "inactive",
    description: "Temporary development cluster",
    createdAt: "2026-03-01T12:00:00Z",
  },
];
