import type { Meta, StoryObj } from "@storybook/react";
import { ExampleForm } from "./example-form";

const meta: Meta<typeof ExampleForm> = {
  title: "Features/Example/ExampleForm",
  component: ExampleForm,
};

export default meta;
type Story = StoryObj<typeof ExampleForm>;

export const Default: Story = {
  args: {
    onSuccess: () => alert("Form submitted successfully"),
    onCancel: () => alert("Form cancelled"),
  },
};
