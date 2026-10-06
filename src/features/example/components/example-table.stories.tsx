import type { Meta, StoryObj } from "@storybook/react";
import { ExampleTable } from "./example-table";
import { mockItemsList } from "../mocks/data";

const meta: Meta<typeof ExampleTable> = {
  title: "Features/Example/ExampleTable",
  component: ExampleTable,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ExampleTable>;

export const Populated: Story = {
  args: {
    initialData: {
      items: mockItemsList,
      total: mockItemsList.length,
      page: 1,
      limit: 10,
    },
  },
};

export const Empty: Story = {
  args: {
    initialData: {
      items: [],
      total: 0,
      page: 1,
      limit: 10,
    },
  },
};
