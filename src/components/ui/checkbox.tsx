"use client";

import { forwardRef, type ReactNode } from "react";
import { Checkbox as HeroCheckbox } from "@heroui/react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps {
  label?: ReactNode;
  children?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  isSelected?: boolean;
  defaultSelected?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (e?: any) => void;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  [key: string]: any;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      children,
      checked,
      defaultChecked,
      isSelected,
      defaultSelected,
      disabled,
      isDisabled,
      isInvalid,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const effectiveSelected = isSelected ?? checked;
    const effectiveDefaultSelected = defaultSelected ?? defaultChecked;
    const effectiveDisabled = isDisabled ?? disabled;
    const content = label || children;

    return (
      <HeroCheckbox
        id={id}
        isSelected={effectiveSelected}
        defaultSelected={effectiveDefaultSelected}
        isDisabled={effectiveDisabled}
        isInvalid={isInvalid}
        onChange={onChange}
        className={cn(
          "inline-flex items-center gap-2.5 select-none cursor-pointer text-sm font-sans text-muted-foreground transition-colors",
          "data-[selected=true]:text-foreground",
          effectiveDisabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <HeroCheckbox.Control
          className={cn(
            "flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all duration-150",
            "border-border bg-card hover:border-muted-foreground/50",
            "data-[selected=true]:bg-primary data-[selected=true]:border-primary data-[selected=true]:text-primary-foreground",
            isInvalid && "border-danger",
            effectiveDisabled && "bg-muted border-border"
          )}
        >
          <HeroCheckbox.Indicator />
        </HeroCheckbox.Control>
        {content && (
          <HeroCheckbox.Content className="font-normal text-foreground/80">
            {content}
          </HeroCheckbox.Content>
        )}
      </HeroCheckbox>
    );
  }
);

Checkbox.displayName = "Checkbox";
