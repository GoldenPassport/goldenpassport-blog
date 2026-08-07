import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Callout, PullQuote, Republished, type AccentColor } from "./Asides";

/**
 * Editorial asides used inside posts: `Callout`, `PullQuote`, and the
 * `Republished` banner. `Callout` and `PullQuote` both take a `color`
 * (gold / emerald / amber / red / blue); the "all colours" stories lay the
 * full palette out so the tints can be compared at a glance.
 *
 * In real MDX the children arrive wrapped in `<p>`, so the stories wrap their
 * copy the same way to reproduce the exact spacing and `strong` styling.
 */
const COLORS: AccentColor[] = ["gold", "emerald", "amber", "red", "blue"];

const meta: Meta<typeof Callout> = {
  title: "Content / Asides",
  component: Callout,
  parameters: { layout: "padded" },
  argTypes: {
    color: { control: "radio", options: COLORS },
  },
};
export default meta;

type Story = StoryObj<typeof Callout>;

/** A single accent-bordered callout. Change the colour with the control. */
export const CalloutDefault: Story = {
  name: "Callout",
  args: {
    color: "gold",
    children: (
      <p>
        In practical terms, that is around <strong>9 to 9.6 weeks</strong> of
        elapsed time saved across the end-to-end flow.
      </p>
    ),
  },
};

/** Every callout colour, stacked, so the tints can be compared. */
export const CalloutColours: Story = {
  name: "Callout — all colours",
  render: () => (
    <div className="mx-auto max-w-2xl space-y-2">
      {COLORS.map((color) => (
        <Callout key={color} color={color}>
          <p>
            <strong className="capitalize">{color}</strong> — a colour-tinted
            note meant to stand out from the surrounding body copy.
          </p>
        </Callout>
      ))}
    </div>
  ),
};

/** A boxed, big-serif key statement with an optional eyebrow label. */
export const PullQuoteDefault: StoryObj<typeof PullQuote> = {
  name: "PullQuote",
  render: (args) => <PullQuote {...args} />,
  args: {
    color: "emerald",
    label: "The role of the business manager",
    children: (
      <p>A good manager is the gatekeeper of whether change becomes value.</p>
    ),
  },
  argTypes: { color: { control: "radio", options: COLORS } },
};

/** Every pull-quote colour, each with an eyebrow label. */
export const PullQuoteColours: StoryObj<typeof PullQuote> = {
  name: "PullQuote — all colours",
  render: () => (
    <div className="mx-auto max-w-2xl space-y-6">
      {COLORS.map((color) => (
        <PullQuote key={color} color={color} label={`Accent: ${color}`}>
          <p>
            The constraint is rarely the approval itself, it is the missing
            context around it.
          </p>
        </PullQuote>
      ))}
    </div>
  ),
};

/** The "First published on LinkedIn … Republished here." banner. */
export const RepublishedBanner: StoryObj<typeof Republished> = {
  name: "Republished banner",
  render: () => (
    <Republished
      href="https://www.linkedin.com/in/lukeaudie/"
      date="27 June 2025"
    />
  ),
};
