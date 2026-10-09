import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./text";

const meta: Meta<typeof Heading> = {
  title: "UI/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Heading primitive preset to **Inter** (SemiBold 600) with proper semantic HTML tags (`h1`, `h2`, `h3`, `h4`) and exact tracking offsets.",
      },
    },
  },
  argTypes: {
    level: {
      control: "inline-radio",
      options: [1, 2, 3, 4],
      description: "Heading level determining size and default HTML tag.",
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "secondary", "success", "warning", "danger"],
    },
    align: {
      control: "inline-radio",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 2,
    children: "Welcome back",
    color: "default",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col gap-1 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground">
          &lt;Heading level=&#123;1&#125;&gt; (32px / 41.6px, -0.64px - Inter 600)
        </span>
        <Heading level={1}>Command Center</Heading>
      </div>

      <div className="flex flex-col gap-1 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground">
          &lt;Heading level=&#123;2&#125;&gt; (24px / 32px, -0.48px - Inter 600)
        </span>
        <Heading level={2}>Welcome back</Heading>
      </div>

      <div className="flex flex-col gap-1 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground">
          &lt;Heading level=&#123;3&#125;&gt; (20px / 30px, 0px - Inter 600)
        </span>
        <Heading level={3}>Operational Queues</Heading>
      </div>

      <div className="flex flex-col gap-1 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground">
          &lt;Heading level=&#123;4&#125;&gt; (16px / 25.6px, 0px - Inter 600)
        </span>
        <Heading level={4}>Detailed Metric Breakdown</Heading>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg p-6 bg-card border border-border rounded-xl">
      <Heading level={3} color="default">Default Heading Color</Heading>
      <Heading level={3} color="muted">Muted Heading Color</Heading>
      <Heading level={3} color="primary">Primary Brand Heading</Heading>
      <Heading level={3} color="danger">Danger Alert Heading</Heading>
    </div>
  ),
};
