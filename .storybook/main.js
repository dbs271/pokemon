/** @type { import('@storybook/nextjs').StorybookConfig } */
const path = require("path");
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");
    config.resolve.alias["next/image"] = require.resolve("./NextImage.js");
    return config;
  },
};
export default config;
