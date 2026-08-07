import type { Meta, StoryObj } from "@storybook/react";
import { Chips } from "./Chips";

/**
 * Inline row of small pill badges that tag a paragraph with the concepts it
 * connects to. The optional `label` is the muted lead-in; `items` are the
 * pills, left to right, and wrap onto a second line when the row is full.
 */
const meta: Meta<typeof Chips> = {
  title: "Content / Chips",
  component: Chips,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Chips>;

/** The canonical use: a labelled row tying a step to the decision rights it clarifies. */
export const Clarifies: Story = {
  args: { label: "Clarifies", items: ["Outcome", "Boundaries", "Ownership"] },
};

/** Without a label — just the pills. */
export const NoLabel: Story = {
  name: "Without label",
  args: { items: ["ARIS", "Confluence", "BPMN", "FAD"] },
};

/** Enough items to demonstrate wrapping onto multiple lines. */
export const Wrapping: Story = {
  name: "Many items (wraps)",
  args: {
    label: "Covers",
    items: [
      "Time",
      "Cost",
      "Quality",
      "Risk",
      "Continuity",
      "Ownership",
      "Lineage",
      "Governance",
    ],
  },
};
