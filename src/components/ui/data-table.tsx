"use client";

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { EmptyState } from "./empty-state";
import { LoadingState } from "./loading-state";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(total / pageSize) || 1;

  if (isLoading) {
    return <LoadingState label="Loading table data..." />;
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-xl border border-default-200 overflow-x-auto bg-content1 shadow-sm">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="bg-default-100/75 border-b border-default-200 text-xs font-semibold uppercase text-default-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-default-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center">
                  <EmptyState
                    title={emptyTitle || "No entries found"}
                    description={emptyDescription || "No records match the current filters."}
                  />
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-default-50/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {total > pageSize && onPageChange && (
        <div className="flex justify-between items-center px-2 py-1">
          <span className="text-xs text-default-500">
            Showing {Math.min((page - 1) * pageSize + 1, total)} to{" "}
            {Math.min(page * pageSize, total)} of {total} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="rounded-lg border border-default-200 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-default-100 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-2 text-xs text-default-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="rounded-lg border border-default-200 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-default-100 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
