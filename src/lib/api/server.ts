import { cookies, headers } from "next/headers";
import { serverEnv } from "@/config/environment";
import type { Item, ItemListResponse } from "./generated";

/**
 * Server-side fetcher for React Server Components
 * Forwards cookies and auth headers securely
 */
export async function serverFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  const headersList = await headers();

  const baseUrl = serverEnv.API_URL.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${normalizedEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
      Authorization: headersList.get("authorization") || "",
      ...options.headers,
    },
    // Next.js caching defaults
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Server fetch failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convenience server query for items list in RSC
 */
export async function fetchServerItems(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<ItemListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.status) searchParams.set("status", params.status);

  const query = searchParams.toString();
  const endpoint = `/items${query ? `?${query}` : ""}`;

  return serverFetch<ItemListResponse>(endpoint);
}

/**
 * Convenience server query for single item in RSC
 */
export async function fetchServerItemById(id: string): Promise<Item> {
  return serverFetch<Item>(`/items/${id}`);
}
