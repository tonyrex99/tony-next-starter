import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface FormFieldProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  description,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {children}
      {description && !error && <span className="text-xs text-default-500">{description}</span>}
      {error && <span className="text-xs text-danger font-medium">{error}</span>}
    </div>
  );
}
