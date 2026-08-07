import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

/**
 * Horizontal bar chart for comparing a small set of values, rendered in pure
 * HTML/CSS. Bar widths come from the percentage of the largest value; set
 * `highlight` on the subject row to pick it out in gold. Optional per-bar
 * `note` and a chart `footnote` carry caveats.
 */
const meta: Meta<typeof BarChart> = {
  title: "Content / BarChart",
  component: BarChart,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BarChart>;

/** The canonical use: one highlighted subject against peers. */
export const Default: Story = {
  args: {
    title: "Monthly downloads, agentic frameworks",
    bars: [
      { label: "LangGraph", value: 62, suffix: "M", highlight: true },
      { label: "Vercel AI SDK", value: 55.4, suffix: "M", note: "different scope" },
      { label: "Pydantic AI", value: 41, suffix: "M" },
    ],
    footnote: "Combined Python + JS where applicable.",
  },
};

/** No highlight, no footnote — a plain comparison. */
export const Plain: Story = {
  args: {
    title: "Elapsed time by stage (weeks)",
    bars: [
      { label: "Discovery", value: 3 },
      { label: "Build", value: 6 },
      { label: "Approval", value: 1 },
      { label: "Rollout", value: 4 },
    ],
  },
};
