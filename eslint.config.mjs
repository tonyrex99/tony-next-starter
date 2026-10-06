import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "storybook-static/**",
      "src/lib/api/generated/**",
    ],
  },
];

export default eslintConfig;
