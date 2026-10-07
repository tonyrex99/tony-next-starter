import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "storybook-static/**",
      "src/lib/api/generated/**",
      "docs/**",
    ],
  },
  ...nextConfig,
];

export default eslintConfig;
