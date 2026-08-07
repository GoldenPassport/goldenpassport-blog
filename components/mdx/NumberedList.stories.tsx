import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NumberedList, NumberedItem } from "./NumberedList";

/**
 * Numbered list with circular gold badges. Numbers auto-increment via a CSS
 * counter, so reordering items needs no manual re-numbering. Each item's
 * children render inside prose, so a bold lead-in plus body reads like the
 * surrounding article.
 */
const meta: Meta<typeof NumberedList> = {
  title: "Content / NumberedList",
  component: NumberedList,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof NumberedList>;

/** Three items, each a bold lead-in followed by a sentence. */
export const Default: Story = {
  render: () => (
    <NumberedList>
      <NumberedItem>
        <p>
          <strong>Determinism in production.</strong> Stakeholders want to know
          what the agent will do, not just what it did last time.
        </p>
      </NumberedItem>
      <NumberedItem>
        <p>
          <strong>Long-running workflows.</strong> Some steps require human
          approval before they can proceed.
        </p>
      </NumberedItem>
      <NumberedItem>
        <p>
          <strong>Auditability.</strong> Every decision needs a trail that a
          reviewer can follow after the fact.
        </p>
      </NumberedItem>
    </NumberedList>
  ),
};
