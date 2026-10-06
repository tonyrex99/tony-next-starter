import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem, deleteItem } from "@/lib/api/client";
import { exampleKeys } from "./example.keys";
import type { CreateItemRequest, UpdateItemRequest } from "../types";

export function useCreateItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateItemRequest) => {
      const response = await createItem({
        body,
      });

      if (response.error || !response.data) {
        throw new Error(String(response.error || "Failed to create item"));
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.all() });
    },
  });
}

export function useUpdateItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: UpdateItemRequest }) => {
      const response = await updateItem({
        path: { id },
        body,
      });

      if (response.error || !response.data) {
        throw new Error(String(response.error || "Failed to update item"));
      }

      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.all() });
      queryClient.invalidateQueries({ queryKey: exampleKeys.detail(variables.id) });
    },
  });
}

export function useDeleteItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteItem({
        path: { id },
      });

      if (response.error) {
        throw new Error(String(response.error || "Failed to delete item"));
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.all() });
    },
  });
}
