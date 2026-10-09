import type { Meta, StoryObj } from "@storybook/react";
import { Text, Heading, type TextVariant } from "./text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Polymorphic typography component for the Alaafia platform. Supports dual fonts (**Inter** and **Source Sans 3**), 13 Figma design variants, flexible weights, semantic colors, and custom element rendering via the `as` prop.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display",
        "title",
        "section",
        "subheading",
        "metric",
        "body",
        "label-medium",
        "label-semibold",
        "caption",
        "caption-medium",
        "caption-semibold",
        "micro",
        "overline",
      ],
      description: "Visual scale and typography role mapped directly to Figma design tokens.",
    },
    font: {
      control: "inline-radio",
      options: ["inter", "source", "heading", "sans"],
      description: "Font family override. Default is Inter for headings and Source Sans 3 for body/UI.",
    },
    weight: {
      control: "inline-radio",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight override.",
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "secondary", "success", "warning", "danger", "white", "inherit"],
      description: "Semantic color tokens.",
    },
    align: {
      control: "inline-radio",
      options: ["left", "center", "right"],
      description: "Text alignment.",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with an ellipsis when overflowing.",
    },
    as: {
      control: "text",
      description: "Polymorphic HTML element override (e.g. h1, p, span, label, div).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    variant: "body",
    children: "Source Sans 3 - 14px / 20px Regular body text",
    color: "default",
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: Array<{ variant: TextVariant; label: string; desc: string }> = [
      { variant: "display", label: "Display (32px / 41.6px, SemiBold 600 - Inter)", desc: "Command Center header" },
      { variant: "title", label: "Title (24px / 32px, SemiBold 600 - Inter)", desc: "Auth header / Modal title" },
      { variant: "section", label: "Section (20px / 30px, SemiBold 600 - Inter)", desc: "Operational Queues / Portfolio Health" },
      { variant: "subheading", label: "Subheading (16px / 25.6px, Regular 400 - Source Sans 3)", desc: "Operational control center subtitle" },
      { variant: "metric", label: "Metric Value: 2,847 (24px / 32px, SemiBold 600 - Source Sans 3)", desc: "KPI counts & balance values" },
      { variant: "body", label: "Body Regular (14px / 20px, Regular 400 - Source Sans 3)", desc: "Standard body text & descriptions" },
      { variant: "label-medium", label: "Label Medium (14px / 20px, Medium 500 - Source Sans 3)", desc: "Form field labels & button text" },
      { variant: "label-semibold", label: "Label SemiBold (14px / 20px, SemiBold 600 - Source Sans 3)", desc: "Activity row title & exception heading" },
      { variant: "caption", label: "Caption Regular (12px / 16px, Regular 400 - Source Sans 3)", desc: "Footers, target counts & metadata" },
      { variant: "caption-medium", label: "Caption Medium (12px / 16px, Medium 500 - Source Sans 3)", desc: "User name, percent change & link actions" },
      { variant: "caption-semibold", label: "Caption SemiBold (12px / 16px, SemiBold 600 - Source Sans 3)", desc: "Quick action button count badges" },
      { variant: "micro", label: "Micro Regular (10px / 12.5px, Regular 400 - Source Sans 3)", desc: "Logo subtitle & navbar role" },
      { variant: "overline", label: "Overline (11px / 14px, SemiBold 600 Uppercase - Source Sans 3)", desc: "Sidebar category headers" },
    ];

    return (
      <div className="flex flex-col gap-6 max-w-4xl">
        {variants.map((v) => (
          <div key={v.variant} className="flex flex-col gap-1 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded text-muted-foreground font-semibold">
                {v.variant}
              </span>
              <span className="text-xs text-muted-foreground">{v.desc}</span>
            </div>
            <Text variant={v.variant}>{v.label}</Text>
          </div>
        ))}
      </div>
    );
  },
};

export const DualFontComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="p-4 rounded-lg bg-muted/40 border border-border">
        <Text variant="label-semibold">Dual-Font System (Inter vs. Source Sans 3)</Text>
        <Text variant="caption" color="muted">
          Compare identical text sizes side-by-side using the <code>font</code> prop.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inter Side */}
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <div className="pb-2 border-b border-border flex items-center justify-between">
            <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
              font="inter" (Inter)
            </span>
            <span className="text-xs text-muted-foreground">Headings & Structural Text</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">display (32px)</span>
              <div><Text variant="display" font="inter">Command Center</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">title (24px)</span>
              <div><Text variant="title" font="inter">Welcome back</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">section (20px)</span>
              <div><Text variant="section" font="inter">Operational Queues</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">metric in inter (24px)</span>
              <div><Text variant="metric" font="inter">2,847</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">body in inter (14px)</span>
              <div><Text variant="body" font="inter">Standard body copy rendered in Inter.</Text></div>
            </div>
          </div>
        </div>

        {/* Source Sans 3 Side */}
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <div className="pb-2 border-b border-border flex items-center justify-between">
            <span className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-semibold">
              font="source" (Source Sans 3)
            </span>
            <span className="text-xs text-muted-foreground">Body, Forms, Metrics & Meta</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">subheading (16px)</span>
              <div><Text variant="subheading" font="source" color="muted">Operational control center</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">metric in source (24px)</span>
              <div><Text variant="metric" font="source">2,847</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">label-medium (14px 500)</span>
              <div><Text variant="label-medium" font="source">Work Email / Remember me</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">body (14px 400)</span>
              <div><Text variant="body" font="source">Standard body copy rendered in Source Sans 3.</Text></div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">caption-medium (12px 500)</span>
              <div><Text variant="caption-medium" font="source">Adebayo Okonkwo • ↑ +3.2%</Text></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md p-6 bg-card border border-border rounded-xl">
      <Text variant="section">Text Colors</Text>
      <Text variant="body" color="default">Default: Primary foreground (#101828)</Text>
      <Text variant="body" color="muted">Muted: Secondary text (#667085)</Text>
      <Text variant="body" color="primary">Primary: Alaafia Electric Blue (#003ADE)</Text>
      <Text variant="body" color="secondary">Secondary: Neutral interactive</Text>
      <Text variant="body" color="success">Success: Green (#00BA55)</Text>
      <Text variant="body" color="warning">Warning: Amber (#F59E0B)</Text>
      <Text variant="body" color="danger">Danger: Red (#EF4444)</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md p-6 bg-card border border-border rounded-xl">
      <Text variant="section">Font Weights</Text>
      <Text variant="body" weight="normal">Normal (400) - Source Sans 3</Text>
      <Text variant="body" weight="medium">Medium (500) - Source Sans 3</Text>
      <Text variant="body" weight="semibold">SemiBold (600) - Source Sans 3</Text>
      <Text variant="body" weight="bold">Bold (700) - Source Sans 3</Text>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs p-6 bg-card border border-border rounded-xl">
      <Text variant="label-semibold">Truncated Single-line Text</Text>
      <div className="p-3 bg-muted rounded-lg border border-border">
        <Text variant="body" truncate>
          Loan #LN-2847 approved for ₦50,000 - Customer: Adewale Johnson - Status: Completed
        </Text>
      </div>
    </div>
  ),
};

export const RealWorldCardComposition: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Text variant="section" font="inter">Dashboard Cards Real-World Demo</Text>

      {/* KPI Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="body" color="muted">Live Customers</Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric">2,847</Text>
            <Text variant="caption-medium" className="text-emerald-600">↑ +3.2%</Text>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="body" color="muted">Active Loans</Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric">1,523</Text>
            <Text variant="caption-medium" className="text-emerald-600">↑ +5.1%</Text>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="body" color="muted">Repayment Rate</Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric">94.2%</Text>
            <Text variant="caption-medium" className="text-emerald-600">↑ +0.8%</Text>
          </div>
        </div>
      </div>

      {/* Activity Item Card */}
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <Text variant="section" font="inter">Recent Activity</Text>
          <Text variant="caption-medium" color="primary" className="cursor-pointer hover:underline">
            View All →
          </Text>
        </div>
        <div className="flex flex-col gap-1">
          <Text variant="label-semibold">Loan Approved</Text>
          <Text variant="body" color="muted">
            Loan #LN-2847 approved for ₦50,000 - Customer: Adewale Johnson
          </Text>
          <Text variant="caption" color="muted">
            Sarah Okonkwo • 2 minutes ago
          </Text>
        </div>
      </div>
    </div>
  ),
};
