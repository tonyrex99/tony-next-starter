import type { Preview } from "@storybook/react";
import { QueryProvider } from "../src/providers/query-provider";
import { ThemeProvider } from "../src/providers/theme-provider";
import "../src/app/globals.css";

// Polyfill process in browser environment
if (typeof window !== "undefined") {
  (window as unknown as { process?: unknown }).process =
    (window as unknown as { process?: unknown }).process || { env: {} };
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
      <QueryProvider>
        <ThemeProvider>
          <div className="p-6 min-h-screen bg-transparent text-foreground flex items-center justify-center">
            <Story />
          </div>
        </ThemeProvider>
      </QueryProvider>
    ),
  ],
};

export default preview;
