import { NextRequest, NextResponse } from "next/server";
import { mockItemsList } from "@/features/example/mocks/data";
import type { Item, ItemListResponse } from "@/features/example/types";

// In-memory items store for development
let devItems: Item[] = [...mockItemsList];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search")?.toLowerCase();
  const status = searchParams.get("status");

  let filtered = [...devItems];

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

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newItem: Item = {
      id: `item_${Date.now()}`,
      name: body.name || "Untitled Item",
      category: body.category || "General",
      amount: Number(body.amount) || 0,
      status: body.status || "active",
      description: body.description || "",
      createdAt: new Date().toISOString(),
    };

    devItems.unshift(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
