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

    config.define = {
      ...config.define,
      "process.env": "{}",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      process: "({ env: {} })",
      global: "window",
    };

    return config;
  },
};

export default config;
