"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { Input as HeroInput } from "@heroui/react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface InputProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
  isInvalid?: boolean;
  onValueChange?: (value: string) => void;
  isClearable?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  [key: string]: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      startContent,
      endContent,
      isInvalid = false,
      onValueChange,
      onChange,
      isClearable = false,
      onClear,
      showPasswordToggle = false,
      size = "md",
      value,
      disabled,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const effectiveType = showPasswordToggle ? (isPasswordVisible ? "text" : "password") : type;
    const effectiveDisabled = disabled || isDisabled;

    const sizeClasses: Record<string, string> = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-3.5 text-sm",
      lg: "h-12 px-4 text-base",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const hasEndContent = endContent || isClearable || showPasswordToggle;

    return (
      <div className="relative flex w-full items-center">
        {startContent && (
          <div className="pointer-events-none absolute left-3.5 z-10 flex items-center justify-center text-muted-foreground">
            {startContent}
          </div>
        )}
        <HeroInput
          ref={ref}
          type={effectiveType}
          disabled={effectiveDisabled}
          {...(value !== undefined ? { value } : {})}
          onChange={handleChange}
          className={cn(
            "w-full rounded-xl border bg-card text-foreground transition-all duration-150",
            "placeholder:text-muted-foreground focus:outline-none",
            "disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed",
            isInvalid
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
              : "border-border hover:border-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20",
            startContent && "pl-10",
            hasEndContent && "pr-10",
            sizeClasses[size || "md"],
            className
          )}
          {...props}
        />
        {isClearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 z-10 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            tabIndex={-1}
            className="absolute right-3 z-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        )}
        {!isClearable && !showPasswordToggle && endContent && (
          <div className="absolute right-3 z-10 flex items-center justify-center text-muted-foreground">
            {endContent}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
