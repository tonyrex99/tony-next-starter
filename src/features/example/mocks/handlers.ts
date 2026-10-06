import { http, HttpResponse } from "msw";
import { mockItemsList } from "./data";
import type { Item, ItemListResponse } from "../types";

let currentItems = [...mockItemsList];

export const exampleHandlers = [
  // List items
  http.get("*/items", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search")?.toLowerCase();
    const status = url.searchParams.get("status");

    let filtered = [...currentItems];

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)
      );
    }

    if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    const response: ItemListResponse = {
      items: paginated,
      total: filtered.length,
      page,
      limit,
    };

    return HttpResponse.json(response);
  }),

  // Get item by ID
  http.get("*/items/:id", ({ params }) => {
    const { id } = params;
    const item = currentItems.find((i) => i.id === id);

    if (!item) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(item);
  }),

  // Create item
  http.post("*/items", async ({ request }) => {
    const body = (await request.json()) as Omit<Item, "id" | "createdAt">;
    const newItem: Item = {
      ...body,
      id: `item_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    currentItems.unshift(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  // Delete item
  http.delete("*/items/:id", ({ params }) => {
    const { id } = params;
    currentItems = currentItems.filter((i) => i.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];
