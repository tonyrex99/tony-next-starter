"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Spinner } from "@heroui/react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "flat";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isIconOnly?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  as?: any;
  href?: string;
  onPress?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isIconOnly = false,
      startContent,
      endContent,
      children,
      disabled,
      as: Component = "button",
      onPress,
      onClick,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-default-100 text-foreground hover:bg-default-200",
      outline: "border border-default-300 text-foreground hover:bg-default-100",
      ghost: "text-foreground hover:bg-default-100",
      danger: "bg-danger text-danger-foreground hover:bg-danger/90",
      flat: "bg-default-100 text-foreground hover:bg-default-200",
    }[variant];

    const sizeStyles = {
      sm: isIconOnly ? "h-8 w-8 p-0" : "h-8 px-3 text-xs",
      md: isIconOnly ? "h-10 w-10 p-0" : "h-10 px-4 text-sm",
      lg: isIconOnly ? "h-12 w-12 p-0" : "h-12 px-6 text-base",
    }[size];

    const handleClick = (e: any) => {
      onPress?.();
      onClick?.(e);
    };

    return (
      <Component
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" color="current" />}
        {!isLoading && startContent}
        {children}
        {!isLoading && endContent}
      </Component>
    );
  }
);

Button.displayName = "Button";
