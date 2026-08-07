import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineEntry } from "./Timeline";

/**
 * Vertical timeline for "short history" sections. `TimelineEntry` carries a
 * `date` (the year is auto-derived into the circle and stripped from the
 * label); mark the final entry `current` for the larger, ring-haloed "you are
 * here" circle. Children render inside prose, so links and emphasis inherit.
 */
const meta: Meta<typeof Timeline> = {
  title: "Content / Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Timeline>;

/** A three-entry history ending on the current release. */
export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineEntry date="January 2024">
        <p>
          Public launch. Python v0.0.10 on 9 January, JS v0.0.1 on 18 January.
        </p>
      </TimelineEntry>
      <TimelineEntry date="22 October 2025">
        <p>
          Rapid adoption across agentic projects, with the ecosystem maturing
          around <a href="#">durable execution</a>.
        </p>
      </TimelineEntry>
      <TimelineEntry date="Today" current>
        <p>v1.2.2 (Python) and v1.3.2 (JS) are the current releases.</p>
      </TimelineEntry>
    </Timeline>
  ),
};

/** A single current entry, showing the ring-haloed circle on its own. */
export const CurrentOnly: Story = {
  name: "Current entry",
  render: () => (
    <Timeline>
      <TimelineEntry date="Today" current>
        <p>You are here: the latest state of play.</p>
      </TimelineEntry>
    </Timeline>
  ),
};
