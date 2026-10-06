import { Card } from "@heroui/react";
import { Boxes, CheckCircle2, DollarSign } from "lucide-react";
import { MoneyDisplay } from "@/components/shared/money-display";
import { calculateTotalValue, countByStatus } from "../utils/example.utils";
import type { Item } from "../types";

export interface ExampleStatsProps {
  items: Item[];
}

export function ExampleStats({ items }: ExampleStatsProps) {
  const totalValue = calculateTotalValue(items);
  const statusCounts = countByStatus(items);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="border border-default-200 bg-content1 shadow-sm p-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Boxes className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-default-500">Total Items</p>
            <p className="text-2xl font-bold text-foreground">{items.length}</p>
          </div>
        </div>
      </Card>

      <Card className="border border-default-200 bg-content1 shadow-sm p-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-default-500">Active Items</p>
            <p className="text-2xl font-bold text-foreground">{statusCounts.active || 0}</p>
          </div>
        </div>
      </Card>

      <Card className="border border-default-200 bg-content1 shadow-sm p-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-default-500">Portfolio Value</p>
            <p className="text-2xl font-bold">
              <MoneyDisplay amount={totalValue} />
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
