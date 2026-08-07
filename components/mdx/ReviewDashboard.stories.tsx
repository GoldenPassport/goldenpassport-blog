import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewDashboard } from "./ReviewDashboard";

/**
 * Poster-style hero for Automation Review posts: status banner, name, pitch,
 * meta chips, a market-reach comparison, the problems the tool solves (icon
 * keys: state / clock / branch / stream / group / shield / bolt), and
 * pros / cons panels. All content is structured props — no children.
 */
const meta: Meta<typeof ReviewDashboard> = {
  title: "Content / ReviewDashboard",
  component: ReviewDashboard,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ReviewDashboard>;

/** Full dashboard with a market-reach bar chart. */
export const WithReachChart: Story = {
  name: "With reach chart",
  args: {
    name: "LangGraph",
    kicker: "Automation Review · Vol 1",
    pitch:
      "A low-level orchestration framework for stateful, long-running agents.",
    meta: [
      { label: "Licence", value: "MIT" },
      { label: "Language", value: "Python + JS" },
      { label: "First release", value: "Jan 2024" },
    ],
    problems: [
      { icon: "state", title: "Shared state" },
      { icon: "branch", title: "Branching flows" },
      { icon: "clock", title: "Long-running steps" },
      { icon: "group", title: "Multi-agent" },
    ],
    reach: {
      label: "Market reach",
      labelHref: "#references",
      bars: [
        { label: "LangGraph", value: 62, display: "62M", highlight: true },
        { label: "Vercel AI SDK", value: 55, display: "55M" },
        { label: "Pydantic AI", value: 41, display: "41M" },
      ],
    },
    pros: [
      "Explicit, inspectable state at every step.",
      "Durable execution with checkpointing.",
      "First-class human-in-the-loop pauses.",
    ],
    cons: [
      "Steeper learning curve than higher-level SDKs.",
      "Boilerplate for simple linear flows.",
    ],
  },
};

/** The single big-number reach variant (no bars). */
export const WithPrimaryNumber: Story = {
  name: "With primary number",
  args: {
    ...WithReachChart.args!,
    reach: {
      label: "Market reach",
      primary: "~62M",
      primaryLabel: "downloads / 30 days",
    },
  },
};
