import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Match the live site's cream backdrop so stories render in-brand.
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FBF7EF" },
        { name: "cream-50", value: "#FEFCF8" },
        { name: "white", value: "#FFFFFF" },
        { name: "ink", value: "#0F1B2D" },
      ],
    },
    a11y: {
      // 'todo' shows a11y violations in the test UI without failing.
      // Flip to 'error' to fail CI on AA violations.
      test: "todo",
    },
  },
  // Wrap every story in the brand font links so serif and sans render
  // identically to the live site (Cormorant Garamond + Inter from Google Fonts).
  decorators: [
    (Story) => (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <Story />
      </>
    ),
  ],
};

export default preview;
