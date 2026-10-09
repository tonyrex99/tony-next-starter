import type { Meta, StoryObj } from "@storybook/react";
import { Text, type TextVariant } from "./text";

const meta: Meta<typeof Text> = {
  title: "Foundations/Typography",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alaafia Design System typography component. Uses **Inter** (SemiBold 600) for page and section headings, and **Source Sans 3** for body, metrics, form labels, captions, and micro text.",
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
      ],
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "success", "warning", "danger", "inherit"],
    },
    align: {
      control: "inline-radio",
      options: ["left", "center", "right"],
    },
    truncate: {
      control: "boolean",
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

const typographyCatalog: Array<{
  variant: TextVariant;
  name: string;
  font: string;
  weight: string;
  size: string;
  lineHeight: string;
  tracking: string;
  sample: string;
  usage: string;
}> = [
  {
    variant: "display",
    name: "Display (H1)",
    font: "Inter",
    weight: "SemiBold 600",
    size: "32px",
    lineHeight: "41.6px",
    tracking: "-0.64px",
    sample: "Command Center",
    usage: "Page headers & top-level dashboard titles",
  },
  {
    variant: "title",
    name: "Title (H2)",
    font: "Inter",
    weight: "SemiBold 600",
    size: "24px",
    lineHeight: "32px",
    tracking: "-0.48px",
    sample: "Welcome back",
    usage: "Auth modal / card titles & major dialog headings",
  },
  {
    variant: "section",
    name: "Section (H3)",
    font: "Inter",
    weight: "SemiBold 600",
    size: "20px",
    lineHeight: "30px",
    tracking: "0px",
    sample: "Operational Queues",
    usage: "Section headers (Quick Actions, Portfolio Health, Recent Activity)",
  },
  {
    variant: "subheading",
    name: "Subheading",
    font: "Source Sans 3",
    weight: "Regular 400",
    size: "16px",
    lineHeight: "25.6px",
    tracking: "0px",
    sample: "Operational control center and system vitals",
    usage: "Subtitle below page title / lead paragraph",
  },
  {
    variant: "metric",
    name: "Metric Value",
    font: "Source Sans 3",
    weight: "SemiBold 600",
    size: "24px",
    lineHeight: "32px",
    tracking: "0px",
    sample: "2,847",
    usage: "KPI card values, balances (₦14.7k), primary counts",
  },
  {
    variant: "body",
    name: "Body Regular",
    font: "Source Sans 3",
    weight: "Regular 400",
    size: "14px",
    lineHeight: "20px",
    tracking: "0px",
    sample: "Loan #LN-2847 approved for ₦50,000 - Customer: Adewale Johnson",
    usage: "Standard body text, sidebar items, descriptions, duration tags",
  },
  {
    variant: "label-medium",
    name: "Label Medium",
    font: "Source Sans 3",
    weight: "Medium 500",
    size: "14px",
    lineHeight: "20px",
    tracking: "0px",
    sample: "Work Email / Remember me / Open Loan Reviews",
    usage: "Form inputs, button labels, card headers, table column titles",
  },
  {
    variant: "label-semibold",
    name: "Label SemiBold",
    font: "Source Sans 3",
    weight: "SemiBold 600",
    size: "14px",
    lineHeight: "20px",
    tracking: "0px",
    sample: "Exception Detected / Loan Approved",
    usage: "Activity item row titles, exception banners, alert headings",
  },
  {
    variant: "caption",
    name: "Caption Regular",
    font: "Source Sans 3",
    weight: "Regular 400",
    size: "12px",
    lineHeight: "16px",
    tracking: "0px",
    sample: "Sarah Okonkwo • 2 minutes ago • 91% of target",
    usage: "Footers, datepicker triggers, target counters, metadata timestamps",
  },
  {
    variant: "caption-medium",
    name: "Caption Medium",
    font: "Source Sans 3",
    weight: "Medium 500",
    size: "12px",
    lineHeight: "16px",
    tracking: "0px",
    sample: "Adebayo Okonkwo • ↑ +3.2% • View Dashboard →",
    usage: "Navbar username, value change indicators, status pill badges, navigation links",
  },
  {
    variant: "caption-semibold",
    name: "Caption SemiBold",
    font: "Source Sans 3",
    weight: "SemiBold 600",
    size: "12px",
    lineHeight: "16px",
    tracking: "0px",
    sample: "15 pending • 4 alerts",
    usage: "Quick action button count badges, notification count badges",
  },
  {
    variant: "micro",
    name: "Micro Regular",
    font: "Source Sans 3",
    weight: "Regular 400",
    size: "10px",
    lineHeight: "12.5px",
    tracking: "0px",
    sample: "Internal Ops • Operations Manager",
    usage: "Sidebar logo subtitle, navbar user role badge",
  },
];

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-border pb-4">
        <Text variant="display">Typography System</Text>
        <Text variant="subheading" color="muted">
          Unified typography scale classified from Figma specs across the Alaafia platform.
        </Text>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
              <th className="py-3 px-4">Variant</th>
              <th className="py-3 px-4">Font</th>
              <th className="py-3 px-4">Specs</th>
              <th className="py-3 px-4">Sample</th>
              <th className="py-3 px-4">Platform Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {typographyCatalog.map((item) => (
              <tr key={item.variant} className="hover:bg-muted/30 transition-colors">
                <td className="py-3.5 px-4 align-middle">
                  <span className="font-mono text-xs bg-muted text-foreground px-2 py-0.5 rounded font-medium">
                    {item.variant}
                  </span>
                </td>
                <td className="py-3.5 px-4 align-middle text-xs font-medium text-foreground whitespace-nowrap">
                  {item.font}
                </td>
                <td className="py-3.5 px-4 align-middle text-xs text-muted-foreground whitespace-nowrap">
                  <div>{item.weight}</div>
                  <div>
                    {item.size} / {item.lineHeight} ({item.tracking})
                  </div>
                </td>
                <td className="py-3.5 px-4 align-middle">
                  <Text variant={item.variant}>{item.sample}</Text>
                </td>
                <td className="py-3.5 px-4 align-middle text-xs text-muted-foreground max-w-xs">
                  {item.usage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg p-6 bg-card border border-border rounded-xl">
      <Text variant="section">Text Colors</Text>
      <Text variant="body" color="default">
        Default: Primary text color (#101828)
      </Text>
      <Text variant="body" color="muted">
        Muted: Secondary text color (#667085)
      </Text>
      <Text variant="body" color="primary">
        Primary: Alaafia Blue (#003ADE)
      </Text>
      <Text variant="body" color="success">
        Success: Positive state (#00BA55)
      </Text>
      <Text variant="body" color="warning">
        Warning: Attention state (#F59E0B)
      </Text>
      <Text variant="body" color="danger">
        Danger: Error & critical state (#EF4444)
      </Text>
    </div>
  ),
};

export const ContextualRealWorldPreview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Text variant="section">Platform Typography in Context</Text>

      {/* 1. Page Header Block */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-1">
        <Text variant="display">Command Center</Text>
        <Text variant="subheading" color="muted">
          Operational control center
        </Text>
      </div>

      {/* 2. Operational Queues & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="label-medium" color="muted">
            Pending Verifications
          </Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric" className="text-warning">
              23
            </Text>
            <Text variant="body" color="muted">
              pending
            </Text>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="label-medium" color="muted">
            Live Customers
          </Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric">2,847</Text>
            <Text variant="caption-medium" className="text-success">
              ↑ +3.2%
            </Text>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <Text variant="label-medium" color="muted">
            Repayment Rate
          </Text>
          <div className="flex items-baseline gap-2">
            <Text variant="metric">94.2%</Text>
            <Text variant="caption-medium" className="text-success">
              ↑ +0.8%
            </Text>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Row */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
        <Text variant="section">Recent Activity</Text>
        <div className="flex flex-col gap-3 divide-y divide-border">
          <div className="pt-3 first:pt-0 flex flex-col gap-1">
            <Text variant="label-semibold">Loan Approved</Text>
            <Text variant="body" color="muted">
              Loan #LN-2847 approved for ₦50,000 - Customer: Adewale Johnson
            </Text>
            <Text variant="caption" color="muted">
              Sarah Okonkwo • 2 minutes ago
            </Text>
          </div>

          <div className="pt-3 flex flex-col gap-1">
            <Text variant="label-semibold">Upgrade Approved</Text>
            <Text variant="body" color="muted">
              Customer #CU-1523 upgraded to Tier 2 - New limit: ₦150,000
            </Text>
            <Text variant="caption" color="muted">
              Michael Eze • 8 minutes ago
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};
