"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  isInvalid?: boolean;
  onValueChange?: (value: string) => void;
  isClearable?: boolean;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      startContent,
      endContent,
      isInvalid = false,
      onValueChange,
      onChange,
      isClearable = false,
      onClear,
      size = "md",
      value,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <div className="relative flex w-full items-center">
        {startContent && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-default-400">
            {startContent}
          </div>
        )}
        <input
          ref={ref}
          {...(value !== undefined ? { value } : {})}
          onChange={handleChange}
          className={cn(
            "w-full rounded-xl border bg-content1 text-foreground transition-colors placeholder:text-default-400 focus:outline-none focus:ring-1",
            isInvalid
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-default-200 focus:border-primary focus:ring-primary",
            startContent && "pl-9",
            (endContent || isClearable) && "pr-9",
            sizeClasses,
            className
          )}
          {...props}
        />
        {isClearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 flex items-center justify-center text-default-400 hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {!isClearable && endContent && (
          <div className="absolute right-3 flex items-center justify-center text-default-400">
            {endContent}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
