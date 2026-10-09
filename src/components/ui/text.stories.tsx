import type { Meta, StoryObj } from "@storybook/react";
import { Text, Heading, type TextVariant } from "./text";

const meta: Meta<typeof Text> = {
  title: "Foundations/Typography",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alaafia Design System Typography. Built on a dual-font architecture:\n\n- **Inter**: Used for high-impact headings, titles, section headers, and elements where modern geometric structure is desired.\n- **Source Sans 3**: The primary workhorse font for all body copy, KPI values, input labels, buttons, tables, and micro text.\n\nEvery variant supports the `font=\"inter\" | \"source\"` prop to effortlessly toggle between both fonts.",
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
    },
    font: {
      control: "inline-radio",
      options: ["inter", "source"],
    },
    weight: {
      control: "inline-radio",
      options: ["normal", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "secondary", "success", "warning", "danger", "inherit"],
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
    children: "The quick brown fox jumps over the lazy dog.",
    font: "source",
    color: "default",
  },
};

const typographyCatalog: Array<{
  variant: TextVariant;
  name: string;
  defaultFont: "Inter" | "Source Sans 3";
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
    defaultFont: "Inter",
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
    defaultFont: "Inter",
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
    defaultFont: "Inter",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
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
    defaultFont: "Source Sans 3",
    weight: "Regular 400",
    size: "10px",
    lineHeight: "12.5px",
    tracking: "0px",
    sample: "Internal Ops • Operations Manager",
    usage: "Sidebar logo subtitle, navbar user role badge",
  },
  {
    variant: "overline",
    name: "Overline (Category)",
    defaultFont: "Source Sans 3",
    weight: "SemiBold 600",
    size: "11px",
    lineHeight: "14px",
    tracking: "wider",
    sample: "COMMAND CENTER • VERIFICATION",
    usage: "Sidebar section categories, table header labels",
  },
];

export const DualFontComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-border pb-4">
        <Text variant="display" font="inter">
          Dual-Font Architecture: Inter vs. Source Sans 3
        </Text>
        <Text variant="subheading" color="muted">
          Compare side-by-side how the exact same text and variant renders in <strong>Inter</strong> vs. <strong>Source Sans 3</strong>.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inter Column */}
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-primary/10 text-primary font-semibold">
              font="inter" (Inter)
            </span>
            <span className="text-xs text-muted-foreground">Headings & Structural Emphasis</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">display (32px / 41.6px, 600)</span>
              <div><Text variant="display" font="inter">Command Center</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">title (24px / 32px, 600)</span>
              <div><Text variant="title" font="inter">Welcome back</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">section (20px / 30px, 600)</span>
              <div><Text variant="section" font="inter">Operational Queues</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">metric (24px / 32px, 600)</span>
              <div><Text variant="metric" font="inter">2,847 (Inter Metric)</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">body (14px / 20px, 400)</span>
              <div><Text variant="body" font="inter">Standard body copy rendered in Inter font family.</Text></div>
            </div>
          </div>
        </div>

        {/* Source Sans 3 Column */}
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-secondary text-secondary-foreground font-semibold">
              font="source" (Source Sans 3)
            </span>
            <span className="text-xs text-muted-foreground">Body, Forms, KPIs & Metadata</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">subheading (16px / 25.6px, 400)</span>
              <div><Text variant="subheading" font="source" color="muted">Operational control center</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">metric (24px / 32px, 600)</span>
              <div><Text variant="metric" font="source">2,847 (Source Sans Metric)</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">label-medium (14px / 20px, 500)</span>
              <div><Text variant="label-medium" font="source">Work Email • Remember me</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">label-semibold (14px / 20px, 600)</span>
              <div><Text variant="label-semibold" font="source">Loan Approved • Exception Detected</Text></div>
            </div>

            <div className="border-b border-border/50 pb-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">caption-medium (12px / 16px, 500)</span>
              <div><Text variant="caption-medium" font="source">Adebayo Okonkwo • ↑ +3.2%</Text></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CompleteClassificationTable: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-border pb-4">
        <Text variant="display" font="inter">Typography Token Catalog</Text>
        <Text variant="subheading" color="muted">
          All 13 classified design tokens mapped directly from Figma.
        </Text>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
              <th className="py-3 px-4">Variant</th>
              <th className="py-3 px-4">Default Font</th>
              <th className="py-3 px-4">Specs</th>
              <th className="py-3 px-4">Sample Preview</th>
              <th className="py-3 px-4">Figma Usage</th>
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
                <td className="py-3.5 px-4 align-middle text-xs font-semibold whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      item.defaultFont === "Inter"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.defaultFont}
                  </span>
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

export const DedicatedHeadingComponent: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl p-6 bg-card border border-border rounded-xl">
      <div className="border-b border-border pb-3">
        <Heading level={2}>Dedicated &lt;Heading /&gt; Component</Heading>
        <Text variant="subheading" color="muted">
          Semantic headings preset with <strong>Inter</strong> (SemiBold 600) by default.
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <span className="font-mono text-xs text-muted-foreground">&lt;Heading level={1}&gt; (32px / 41.6px, Inter)</span>
          <Heading level={1}>Level 1: Command Center Header</Heading>
        </div>

        <div>
          <span className="font-mono text-xs text-muted-foreground">&lt;Heading level={2}&gt; (24px / 32px, Inter)</span>
          <Heading level={2}>Level 2: Section / Modal Title</Heading>
        </div>

        <div>
          <span className="font-mono text-xs text-muted-foreground">&lt;Heading level={3}&gt; (20px / 30px, Inter)</span>
          <Heading level={3}>Level 3: Dashboard Sub-section</Heading>
        </div>

        <div>
          <span className="font-mono text-xs text-muted-foreground">&lt;Heading level={4}&gt; (16px / 25.6px, Inter)</span>
          <Heading level={4}>Level 4: Card Header / Detailed Block</Heading>
        </div>
      </div>
    </div>
  ),
};

export const RealWorldDashboardPreview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Heading level={3}>Real-World Dashboard Hierarchy</Heading>

      {/* 1. Header Block */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-1">
        <Text variant="display" font="inter">
          Command Center
        </Text>
        <Text variant="subheading" color="muted">
          Operational control center
        </Text>
      </div>

      {/* 2. Operational Queues & KPI Cards */}
      <div className="flex flex-col gap-3">
        <Text variant="section" font="inter">
          Operational Queues
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-amber-200 rounded-xl p-4 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Pending Verifications
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric" className="text-amber-600">
                23
              </Text>
              <Text variant="body" color="muted">
                pending
              </Text>
            </div>
          </div>

          <div className="bg-card border border-blue-200 rounded-xl p-4 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Pending Loan Reviews
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric" className="text-blue-600">
                15
              </Text>
              <Text variant="body" color="muted">
                pending
              </Text>
            </div>
          </div>

          <div className="bg-card border border-amber-200 rounded-xl p-4 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Unmatched Payments
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric" className="text-amber-600">
                12
              </Text>
              <Text variant="body" color="muted">
                pending
              </Text>
            </div>
          </div>

          <div className="bg-card border border-rose-200 rounded-xl p-4 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Open Escalations
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric" className="text-rose-600">
                4
              </Text>
              <Text variant="body" color="muted">
                pending
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Portfolio Health Metrics */}
      <div className="flex flex-col gap-3">
        <Text variant="section" font="inter">
          Portfolio Health
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Live Customers
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric">2,847</Text>
              <Text variant="caption-medium" className="text-emerald-600">
                ↑ +3.2%
              </Text>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Active Loans
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric">1,523</Text>
              <Text variant="caption-medium" className="text-emerald-600">
                ↑ +5.1%
              </Text>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
            <Text variant="body" color="muted">
              Repayment Rate
            </Text>
            <div className="flex items-baseline gap-2">
              <Text variant="metric">94.2%</Text>
              <Text variant="caption-medium" className="text-emerald-600">
                ↑ +0.8%
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Financial Integrity Exception */}
      <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Text variant="label-semibold" className="text-amber-900">
            Exception Detected
          </Text>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            • Needs Attention
          </span>
        </div>
        <Text variant="caption" color="muted">
          Reconciliation Status: 12 unmatched records pending review
        </Text>
        <Text variant="caption-medium" className="text-amber-800 hover:underline cursor-pointer">
          View Dashboard →
        </Text>
      </div>
    </div>
  ),
};
