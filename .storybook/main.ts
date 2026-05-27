import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  // Stories live alongside their components. Co-located keeps things easy to
  // find and reduces drift between component and its docs.
  stories: ["../components/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};

export default config;
