import { formatDate } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export interface DateDisplayProps {
  date: string | number | Date;
  locale?: string;
  className?: string;
}

export function DateDisplay({ date, locale = "en-US", className }: DateDisplayProps) {
  return (
    <span className={cn("text-default-500 text-xs tabular-nums", className)}>
      {formatDate(date, locale)}
    </span>
  );
}
