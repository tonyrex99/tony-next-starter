import type { Preview } from "@storybook/react";
import { AppProviders } from "../src/providers";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#09090b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <div className="p-6 min-h-screen bg-background text-foreground">
          <Story />
        </div>
      </AppProviders>
    ),
  ],
};

export default preview;
