import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description = "Get started by creating your first entry.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-default-200 bg-default-50/50",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-100 text-default-500 mb-4">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-default-500 max-w-sm mt-1 mb-4">{description}</p>
      {action}
    </div>
  );
}
