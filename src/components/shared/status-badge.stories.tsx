import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "Shared/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["active", "inactive", "archived"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Active: Story = {
  args: {
    status: "active",
  },
};

export const Inactive: Story = {
  args: {
    status: "inactive",
  },
};

export const Archived: Story = {
  args: {
    status: "archived",
  },
};
