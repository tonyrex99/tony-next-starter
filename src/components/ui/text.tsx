import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cn } from "@/lib/utils/cn";

export type FontFamily = "inter" | "source" | "heading" | "sans";

export type TextVariant =
  | "display"           // Inter 600, 32px / 41.6px, -0.64px (Page titles / Command Center header)
  | "title"             // Inter 600, 24px / 32px, -0.48px (Auth headers / Modal titles)
  | "section"           // Inter 600, 20px / 30px, 0px (Dashboard section headers)
  | "subheading"        // Source Sans 3 400, 16px / 25.6px, 0px (Lead subtitle / descriptions)
  | "metric"            // Source Sans 3 600, 24px / 32px, 0px (KPI numbers, stat values, balance)
  | "body"              // Source Sans 3 400, 14px / 20px, 0px (Default body copy, descriptions)
  | "label-medium"      // Source Sans 3 500, 14px / 20px, 0px (Input labels, button text, card headers)
  | "label-semibold"    // Source Sans 3 600, 14px / 20px, 0px (Activity titles, exception banners)
  | "caption"           // Source Sans 3 400, 12px / 16px, 0px (Footers, datepicker, target meta, timestamps)
  | "caption-medium"    // Source Sans 3 500, 12px / 16px, 0px (Usernames, badge tags, percent changes, link actions)
  | "caption-semibold"  // Source Sans 3 600, 12px / 16px, 0px (Badge count pills)
  | "micro"             // Source Sans 3 400, 10px / 12.5px, 0px (Logo subtitle, role tag)
  | "overline";         // Source Sans 3 600, 11px / 14px, uppercase (Sidebar section titles)

export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export type TextColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "white"
  | "inherit";

export type TextAlign = "left" | "center" | "right";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  font?: FontFamily;
  weight?: TextWeight;
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
  overline: "span",
};

const defaultFontMap: Record<TextVariant, FontFamily> = {
  display: "inter",
  title: "inter",
  section: "inter",
  subheading: "source",
  metric: "source",
  body: "source",
  "label-medium": "source",
  "label-semibold": "source",
  caption: "source",
  "caption-medium": "source",
  "caption-semibold": "source",
  micro: "source",
  overline: "source",
};

const fontStyles: Record<FontFamily, string> = {
  inter: "font-inter",
  heading: "font-heading",
  source: "font-source",
  sans: "font-sans",
};

const weightStyles: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const variantSizeStyles: Record<TextVariant, { size: string; defaultWeight: string }> = {
  display: {
    size: "text-[32px] leading-[41.6px] tracking-[-0.64px]",
    defaultWeight: "font-semibold",
  },
  title: {
    size: "text-[24px] leading-[32px] tracking-[-0.48px]",
    defaultWeight: "font-semibold",
  },
  section: {
    size: "text-[20px] leading-[30px] tracking-normal",
    defaultWeight: "font-semibold",
  },
  subheading: {
    size: "text-[16px] leading-[25.6px] tracking-normal",
    defaultWeight: "font-normal",
  },
  metric: {
    size: "text-[24px] leading-[32px] tracking-normal",
    defaultWeight: "font-semibold",
  },
  body: {
    size: "text-[14px] leading-[20px] tracking-normal",
    defaultWeight: "font-normal",
  },
  "label-medium": {
    size: "text-[14px] leading-[20px] tracking-normal",
    defaultWeight: "font-medium",
  },
  "label-semibold": {
    size: "text-[14px] leading-[20px] tracking-normal",
    defaultWeight: "font-semibold",
  },
  caption: {
    size: "text-[12px] leading-[16px] tracking-normal",
    defaultWeight: "font-normal",
  },
  "caption-medium": {
    size: "text-[12px] leading-[16px] tracking-normal",
    defaultWeight: "font-medium",
  },
  "caption-semibold": {
    size: "text-[12px] leading-[16px] tracking-normal",
    defaultWeight: "font-semibold",
  },
  micro: {
    size: "text-[10px] leading-[12.5px] tracking-normal",
    defaultWeight: "font-normal",
  },
  overline: {
    size: "text-[11px] leading-[14px] uppercase tracking-wider",
    defaultWeight: "font-semibold",
  },
};

const colorStyles: Record<TextColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
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
      font,
      weight,
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
    const resolvedFont = font ? fontStyles[font] : fontStyles[defaultFontMap[variant]];
    const resolvedWeight = weight ? weightStyles[weight] : variantSizeStyles[variant].defaultWeight;
    const resolvedSize = variantSizeStyles[variant].size;

    return (
      <Component
        ref={ref as any}
        className={cn(
          resolvedFont,
          resolvedWeight,
          resolvedSize,
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

/* -------------------------------------------------------------------------- */
/* Heading Component Wrapper (Inter by default)                              */
/* -------------------------------------------------------------------------- */

export interface HeadingProps extends Omit<TextProps, "variant"> {
  level?: 1 | 2 | 3 | 4;
}

const headingLevelVariantMap: Record<number, TextVariant> = {
  1: "display",
  2: "title",
  3: "section",
  4: "subheading",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, font = "inter", as, children, ...props }, ref) => {
    const defaultTag = (`h${level}` as ElementType) || "h2";
    const variant = headingLevelVariantMap[level] || "title";

    return (
      <Text
        ref={ref as any}
        as={as || defaultTag}
        variant={variant}
        font={font}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Heading.displayName = "Heading";
