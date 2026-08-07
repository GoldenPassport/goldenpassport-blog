import type { Meta, StoryObj } from "@storybook/react";
import { DownloadsChart } from "./DownloadsChart";

/**
 * Donut chart (inline SVG, no client runtime) for a small split of two-to-four
 * values around a centre total. Each slice takes a named `colour` from the
 * site palette (gold / ink / emerald / blue); percentages are computed from
 * the values and shown in the legend.
 */
const meta: Meta<typeof DownloadsChart> = {
  title: "Content / DownloadsChart",
  component: DownloadsChart,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof DownloadsChart>;

/** Two-slice split with a combined total in the centre. */
export const TwoSlice: Story = {
  name: "Two slices",
  args: {
    title: "LangGraph downloads, last 30 days",
    total: "~62M",
    totalLabel: "combined",
    slices: [
      { label: "Python (PyPI)", value: 52.3, suffix: "M", colour: "gold" },
      { label: "JavaScript (npm)", value: 9.7, suffix: "M", colour: "ink" },
    ],
    footnote: "Python ~326M all-time; JS ~2.3M weekly.",
  },
};

/** Four slices, exercising the full colour set. */
export const FourSlice: Story = {
  name: "Four slices",
  args: {
    title: "Where the effort goes",
    total: "100%",
    totalLabel: "of effort",
    slices: [
      { label: "Discovery", value: 25, suffix: "%", colour: "gold" },
      { label: "Build", value: 45, suffix: "%", colour: "ink" },
      { label: "Approval", value: 10, suffix: "%", colour: "emerald" },
      { label: "Rollout", value: 20, suffix: "%", colour: "blue" },
    ],
  },
};
