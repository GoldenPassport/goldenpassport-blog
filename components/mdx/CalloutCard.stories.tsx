import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TldrCard, VerdictCard, CtaCard } from "./CalloutCard";

/**
 * Accent cards for structurally-important sections: `TldrCard` (ink),
 * `VerdictCard` (sage green), `CtaCard` (blue). Each takes an optional `label`
 * and renders its children as-is, inheriting the article's `prose` styles — so
 * every story is wrapped in a `prose` container to match the live post context.
 */
const meta: Meta<typeof TldrCard> = {
  title: "Content / Callout cards",
  component: TldrCard,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="prose prose-lg mx-auto max-w-2xl font-serif">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TldrCard>;

/** Ink-toned summary card for the top of a post. */
export const Tldr: Story = {
  name: "TldrCard",
  args: {
    children: (
      <p>
        Managers are cast as the new bottleneck to AI-led delivery. The
        constraint is rarely the approval itself, it is the missing context
        around it.
      </p>
    ),
  },
};

/** Sage-green "the take" card, used at a conclusion. */
export const Verdict: StoryObj<typeof VerdictCard> = {
  name: "VerdictCard",
  render: (args) => <VerdictCard {...args} />,
  args: {
    children: (
      <p>
        Fix the context around the decision and the approval stops being a
        queue. That is an operating-model job, not a tooling one.
      </p>
    ),
  },
};

/** Blue "next action" card, used to prompt getting in touch. */
export const Cta: StoryObj<typeof CtaCard> = {
  name: "CtaCard",
  render: (args) => <CtaCard {...args} />,
  args: {
    label: "Let's talk",
    children: (
      <p>
        If this resonates, <a href="/contact">drop me a message</a>.
      </p>
    ),
  },
};

/** All three cards together, showing their distinct semantic tones. */
export const AllThree: Story = {
  name: "All three tones",
  render: () => (
    <>
      <TldrCard>
        <p>One short paragraph that answers the question of the post.</p>
      </TldrCard>
      <VerdictCard>
        <p>The conclusion, stated plainly.</p>
      </VerdictCard>
      <CtaCard label="Let's talk">
        <p>
          Drop me a <a href="/contact">message</a> if this resonates.
        </p>
      </CtaCard>
    </>
  ),
};
