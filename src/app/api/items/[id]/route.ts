import { NextRequest, NextResponse } from "next/server";
import { mockItemsList } from "@/features/example/mocks/data";
import type { Item } from "@/features/example/types";

let devItems: Item[] = [...mockItemsList];

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = devItems.find((i) => i.id === id);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itemIndex = devItems.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    devItems[itemIndex] = {
      ...devItems[itemIndex],
      ...body,
    };

    return NextResponse.json(devItems[itemIndex]);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  devItems = devItems.filter((i) => i.id !== id);
  return new NextResponse(null, { status: 204 });
}
