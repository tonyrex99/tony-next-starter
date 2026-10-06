import type { Item, ItemListResponse } from "@/lib/api/generated";

export type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  ItemListResponse,
} from "@/lib/api/generated";

export interface ItemFilters {
  search?: string;
  status?: "active" | "inactive" | "archived" | "";
  page: number;
  limit: number;
}

export type ItemTableData = Item;
