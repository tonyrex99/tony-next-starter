import type { Preview } from "@storybook/react";
import { AppProviders } from "../src/providers";
import "../src/app/globals.css";

// Polyfill process in browser environment for Next.js internal modules
if (typeof window !== "undefined") {
  // @ts-expect-error polyfill process for browser environment
  window.process = window.process || { env: {} };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#09090b" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <div className="p-6 min-h-screen bg-transparent text-foreground flex items-center justify-center">
          <Story />
        </div>
      </AppProviders>
    ),
  ],
};

export default preview;
