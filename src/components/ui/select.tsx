"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectClearButton,
  SelectPopover,
} from "@heroui/react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  isInvalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, value, isInvalid, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          value={value}
          disabled={disabled}
          className={cn(
            "w-full appearance-none rounded-xl border bg-card px-3.5 py-2.5 text-sm font-sans text-foreground transition-all duration-150",
            "focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
            isInvalid
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-border hover:border-muted-foreground/40 focus:border-primary focus:ring-primary/20",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }
);

Select.displayName = "Select";
