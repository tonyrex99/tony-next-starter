"use client";

import { forwardRef, type ReactNode } from "react";
import { Button as HeroButton, Spinner } from "@heroui/react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "flat";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isIconOnly?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  as?: any;
  href?: string;
  onPress?: () => void;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isIconOnly = false,
      fullWidth = false,
      startContent,
      endContent,
      children,
      disabled,
      isDisabled,
      onPress,
      onClick,
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<string, string> = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm shadow-primary/20 focus-visible:ring-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active focus-visible:ring-muted-foreground",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-border/80 active:bg-secondary-active focus-visible:ring-primary",
      ghost:
        "text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary-active focus-visible:ring-primary border-none",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger/80 shadow-sm shadow-danger/20 focus-visible:ring-danger",
      flat:
        "bg-primary-subtle text-primary hover:bg-primary/20 active:bg-primary/30 focus-visible:ring-primary",
    };

    const sizeStyles: Record<string, string> = {
      sm: isIconOnly ? "h-8.5 w-8.5 p-0" : "h-8.5 px-3 text-xs gap-1.5",
      md: isIconOnly ? "h-11 w-11 p-0" : "h-11 px-4.5 text-[14px] leading-[21px] gap-2",
      lg: isIconOnly ? "h-12 w-12 p-0" : "h-12 px-6 text-base gap-2.5",
    };

    const effectiveDisabled = disabled || isDisabled || isLoading;

    return (
      <HeroButton
        ref={ref}
        isDisabled={effectiveDisabled}
        onPress={() => {
          onPress?.();
          onClick?.();
        }}
        isIconOnly={isIconOnly}
        fullWidth={fullWidth}
        className={cn(
          "inline-flex items-center justify-center text-center font-sans font-medium tracking-normal rounded-lg transition-all duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variantStyles[variant || "primary"],
          sizeStyles[size || "md"],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" color="current" />}
        {!isLoading && startContent}
        {children}
        {!isLoading && endContent}
      </HeroButton>
    );
  }
);

Button.displayName = "Button";
