"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, RotateCcw } from "lucide-react";
import { Select } from "@/components/ui/select";
import { useExampleFilters } from "../hooks/use-example-filters";
import { useExampleUIStore } from "../stores/example-ui.store";

export function ExampleFilters() {
  const { search, setSearch, status, setStatus, resetFilters } = useExampleFilters();
  const openCreateModal = useExampleUIStore((state) => state.openCreateModal);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search items by name or category..."
          value={search}
          onValueChange={setSearch}
          startContent={<Search className="h-4 w-4 text-default-400" />}
          className="max-w-xs"
          size="sm"
          isClearable
          onClear={() => setSearch("")}
        />

        <div className="w-40">
          <Select
            placeholder="All Statuses"
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        {(Boolean(search) || Boolean(status)) && (
          <Button
            size="sm"
            variant="flat"
            onPress={resetFilters}
            startContent={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Reset
          </Button>
        )}
      </div>

      <Button
        variant="primary"
        size="sm"
        startContent={<Plus className="h-4 w-4" />}
        onPress={openCreateModal}
      >
        New Item
      </Button>
    </div>
  );
}
