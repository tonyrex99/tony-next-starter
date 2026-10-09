import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cn } from "@/lib/utils/cn";

export type TextVariant =
  | "display"
  | "title"
  | "section"
  | "subheading"
  | "metric"
  | "body"
  | "label-medium"
  | "label-semibold"
  | "caption"
  | "caption-medium"
  | "caption-semibold"
  | "micro";

export type TextColor =
  | "default"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "white"
  | "inherit";

export type TextAlign = "left" | "center" | "right";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
}

const defaultElementMap: Record<TextVariant, ElementType> = {
  display: "h1",
  title: "h2",
  section: "h3",
  subheading: "p",
  metric: "div",
  body: "p",
  "label-medium": "span",
  "label-semibold": "span",
  caption: "span",
  "caption-medium": "span",
  "caption-semibold": "span",
  micro: "span",
};

const variantStyles: Record<TextVariant, string> = {
  display:
    "font-[family-name:var(--font-heading)] font-semibold text-[32px] leading-[41.6px] tracking-[-0.64px]",
  title:
    "font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] tracking-[-0.48px]",
  section:
    "font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[30px] tracking-normal",
  subheading:
    "font-sans font-normal text-[16px] leading-[25.6px] tracking-normal",
  metric:
    "font-sans font-semibold text-[24px] leading-[32px] tracking-normal",
  body:
    "font-sans font-normal text-[14px] leading-[20px] tracking-normal",
  "label-medium":
    "font-sans font-medium text-[14px] leading-[20px] tracking-normal",
  "label-semibold":
    "font-sans font-semibold text-[14px] leading-[20px] tracking-normal",
  caption:
    "font-sans font-normal text-[12px] leading-[16px] tracking-normal",
  "caption-medium":
    "font-sans font-medium text-[12px] leading-[16px] tracking-normal",
  "caption-semibold":
    "font-sans font-semibold text-[12px] leading-[16px] tracking-normal",
  micro:
    "font-sans font-normal text-[10px] leading-[12.5px] tracking-normal",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  white: "text-white",
  inherit: "text-inherit",
};

const alignStyles: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      variant = "body",
      color = "default",
      align = "left",
      truncate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || defaultElementMap[variant] || "span";

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantStyles[variant],
          colorStyles[color],
          alignStyles[align],
          truncate && "truncate",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
