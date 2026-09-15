import type { Meta, StoryObj } from "@storybook/react";
import { Scorecard, ScorecardRow, ScorecardSummary } from "./Scorecard";

/**
 * A verdict table: each concern gets its technical answer, pass or fail, a
 * score out of 10, one strength, one improvement opportunity and an evidence
 * dialog.
 */
const meta: Meta<typeof Scorecard> = {
  title: "Content / Scorecard",
  component: Scorecard,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Scorecard>;

export const Default: Story = {
  render: () => (
    <Scorecard>
      <ScorecardRow
        concern="Accountability."
        question="Who answers when the agent acts?"
        answer="A send-and-wait step owned by the process holds every risky reply until a named person releases it."
        verdict="pass"
        score={7}
        plus="Both approvals paused the run and every decision is recorded."
        minus="Capture who approved on every approval step."
      >
        <p>
          <strong>Recorded:</strong> the phone change paused until Approve was clicked and wrote row 1 of the decisions table.
        </p>
      </ScorecardRow>
      <ScorecardRow
        concern="Drift."
        question="Will it quietly get worse?"
        answer="An evaluation over twelve conversations records whether each took the expected route."
        verdict="partial"
        score={5}
        plus="Every scorable conversation took the expected route."
        minus="Score the steps that wait for a person too."
      >
        <p>Three runs recorded, with the harness fixes between them.</p>
      </ScorecardRow>
    </Scorecard>
  ),
};

/** The overall verdict card that follows a scorecard. */
export const Summary: Story = {
  render: () => (
    <ScorecardSummary score={8} headline="A very strong product" note="Blends the concerns above with how the build felt">
      <p>Quick to learn, with the whole process visible on one canvas.</p>
      <ol>
        <li><strong>A shared policy.</strong> One versioned place for the rules every agent follows.</li>
        <li><strong>A smarter review step.</strong> Check the proposed call before a person is asked.</li>
      </ol>
    </ScorecardSummary>
  ),
};
