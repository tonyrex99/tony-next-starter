import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { default: tsconfigPaths } = await import("vite-tsconfig-paths");
    config.plugins = config.plugins || [];
    config.plugins.push(tsconfigPaths());

    // Inject process polyfill script into the very top of iframe.html before any module loads
    config.plugins.push({
      name: "vite-plugin-process-polyfill",
      transformIndexHtml() {
        return [
          {
            tag: "script",
            attrs: { type: "text/javascript" },
            children: "window.process = window.process || { env: { NODE_ENV: 'development' } };",
            injectTo: "head-prepend",
          },
        ];
      },
    });

    // Alias next/navigation to lightweight mock to prevent Next.js server runtime from leaking into Vite
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/navigation": path.resolve(process.cwd(), ".storybook/mocks/next-navigation.ts"),
    };

    config.define = {
      ...config.define,
      "process.env": JSON.stringify({}),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      global: "window",
    };

    return config;
  },
};

export default config;
