import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopicsFilter, type TopicChip } from "./TopicsFilter";

const meta: Meta<typeof TopicsFilter> = {
  title: "Navigation / TopicsFilter",
  component: TopicsFilter,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof TopicsFilter>;

function chip(label: string, active = false): TopicChip {
  return { label, href: `/blog?tag=${encodeURIComponent(label)}`, active };
}

const manyTopics: TopicChip[] = [
  "Agentic AI",
  "Automation",
  "BOAT",
  "BPM",
  "Brand",
  "Camunda",
  "ChatGPT",
  "Customer Experience",
  "Design System",
  "GDPR",
  "InsuranceTech",
  "KIE",
  "Open Source",
  "Operating Model",
  "Personalisation",
  "Process Architecture",
  "Process Automation",
  "RAG",
  "React",
  "Regulated Industries",
  "Responsible AI",
  "RPA",
  "Strategy",
  "Tech",
  "Trade",
].map((t) => chip(t));

/** Collapsed by default — clip to one row + "Show all topics" toggle. */
export const ManyTopicsCollapsed: Story = {
  args: {
    topics: manyTopics,
    clearHref: null,
  },
};

/** With an active filter — Clear link appears alongside the toggle. */
export const ManyTopicsWithActive: Story = {
  args: {
    topics: manyTopics.map((t, i) => (i === 0 ? { ...t, active: true } : t)),
    clearHref: "/blog",
  },
};

/** Only a few topics — no toggle is rendered (no overflow). */
export const FewTopics: Story = {
  args: {
    topics: [chip("Agentic AI"), chip("BPM"), chip("RPA")],
    clearHref: null,
  },
};

/** Few topics, with an active filter — only the Clear link is shown below. */
export const FewTopicsWithActive: Story = {
  args: {
    topics: [chip("Agentic AI", true), chip("BPM"), chip("RPA")],
    clearHref: "/blog",
  },
};
