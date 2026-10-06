"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { DateDisplay } from "@/components/shared/date-display";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useItemsQuery } from "../queries/example.queries";
import { useDeleteItemMutation } from "../queries/example.mutations";
import { useExampleFilters } from "../hooks/use-example-filters";
import { useExampleUIStore } from "../stores/example-ui.store";
import type { Item, ItemListResponse } from "../types";

export interface ExampleTableProps {
  initialData?: ItemListResponse;
}

export function ExampleTable({ initialData }: ExampleTableProps) {
  const { page, setPage, search, status } = useExampleFilters();
  const openDetailsDrawer = useExampleUIStore((state) => state.openDetailsDrawer);
  const deleteMutation = useDeleteItemMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useItemsQuery({
    page,
    limit: 10,
    search,
    status,
  });

  const currentData = data ?? initialData;

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-foreground">{row.original.name}</p>
            {row.original.description && (
              <p className="text-xs text-default-400 line-clamp-1">{row.original.description}</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-xs font-medium text-default-600">{row.original.category}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <MoneyDisplay amount={row.original.amount} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => <DateDisplay date={row.original.createdAt} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1 justify-end">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              title="View Details"
              aria-label="View Details"
              onPress={() => openDetailsDrawer(row.original)}
            >
              <Eye className="h-4 w-4 text-default-500" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              title="Delete Item"
              aria-label="Delete Item"
              onPress={() => setDeletingId(row.original.id)}
            >
              <Trash2 className="h-4 w-4 text-danger" />
            </Button>
          </div>
        ),
      },
    ],
    [openDetailsDrawer]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={currentData?.items ?? []}
        isLoading={isLoading && !currentData}
        total={currentData?.total ?? 0}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        emptyTitle="No items found"
        emptyDescription="Create your first item or adjust your search filters."
      />

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={async () => {
          if (deletingId) {
            await deleteMutation.mutateAsync(deletingId);
            setDeletingId(null);
          }
        }}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        isDangerous
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
