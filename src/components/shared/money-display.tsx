import { formatCurrency } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export interface MoneyDisplayProps {
  amount: number;
  currency?: string;
  locale?: string;
  className?: string;
}

export function MoneyDisplay({
  amount,
  currency = "USD",
  locale = "en-US",
  className,
}: MoneyDisplayProps) {
  const formatted = formatCurrency(amount, currency, locale);

  return (
    <span
      className={cn(
        "font-semibold tabular-nums",
        amount < 0 ? "text-danger" : "text-foreground",
        className
      )}
    >
      {formatted}
    </span>
  );
}
