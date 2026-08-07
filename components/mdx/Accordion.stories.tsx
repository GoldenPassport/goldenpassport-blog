import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

/**
 * Collapsible disclosure built on native `<details>` / `<summary>`, used for
 * post-conclusion Terms / Calculations / References. The component wraps its
 * children in the article's `prose` styles, so markdown-style children render
 * exactly as they do in a post.
 */
const meta: Meta<typeof Accordion> = {
  title: "Content / Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

/** Closed by default. Click the summary (or Tab + Enter) to expand. */
export const Closed: Story = {
  args: {
    title: "References",
    children: (
      <>
        <p>
          A native <code>&lt;details&gt;</code> disclosure, so it works without
          JavaScript and is keyboard-operable out of the box.
        </p>
        <ul>
          <li>ISBSG, software delivery benchmarks.</li>
          <li>McKinsey, developer productivity research.</li>
          <li>METR, task-completion study.</li>
        </ul>
      </>
    ),
  },
};

/** Open on initial render — e.g. when linked to as a fragment target. */
export const Open: Story = {
  args: {
    title: "Terms",
    defaultOpen: true,
    children: (
      <>
        <p>
          <strong>ARIS</strong> — a long-recognised platform for process
          analysis and modelling.
        </p>
        <p>
          <strong>FAD</strong> — Function Allocation Diagram, which maps a
          process step to the roles, systems, and data it touches.
        </p>
      </>
    ),
  },
};
