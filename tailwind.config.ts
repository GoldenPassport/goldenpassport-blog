import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7EF",
          50: "#FEFCF8",
          100: "#FBF7EF",
          200: "#F5EDDC",
        },
        ink: {
          DEFAULT: "#0F1B2D",
          soft: "#2A3548",
          mute: "#5B6577",
        },
        gold: {
          DEFAULT: "#B8893B",
          light: "#D4A857",
          deep: "#8C661F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        // Panel content easing in when a process step is selected.
        "step-in": {
          from: { opacity: "0", transform: "translateX(0.75rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "step-in": "step-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2A3548",
            "--tw-prose-headings": "#0F1B2D",
            "--tw-prose-links": "#8C661F",
            "--tw-prose-bold": "#0F1B2D",
            "--tw-prose-quotes": "#0F1B2D",
            "--tw-prose-quote-borders": "#B8893B",
            "--tw-prose-code": "#0F1B2D",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
