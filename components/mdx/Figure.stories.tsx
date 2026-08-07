import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Figure } from "./Figure";

/**
 * Captioned-graphic block used across posts. Three modes:
 *   - a plain string `caption`,
 *   - a rich caption authored as MDX `children` (links / `code` / emphasis),
 *   - a `download` variant that puts a download link to the right of the caption.
 *
 * Storybook serves `public/` at the root, so the `/posts/...` asset paths below
 * resolve to real committed post graphics.
 */
const SRC =
  "/posts/is-managerial-approval-really-the-new-bottleneck/attention-two-camps.svg";

const meta: Meta<typeof Figure> = {
  title: "Content / Figure",
  component: Figure,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Figure>;

/** A plain, centred string caption. */
export const PlainCaption: Story = {
  name: "Plain caption",
  args: {
    src: SRC,
    alt: "Where management attention divides across two camps",
    caption: "Where management attention actually goes.",
  },
};

/** A rich caption authored as children, with a link and inline code. */
export const RichCaption: Story = {
  name: "Rich caption (children)",
  render: (args) => (
    <Figure {...args}>
      <p>
        Caption with a <a href="#link">link</a> and some{" "}
        <code>inline-code</code>, authored as MDX children.
      </p>
    </Figure>
  ),
  args: {
    src: SRC,
    alt: "Where management attention divides across two camps",
  },
};

/** The download variant: caption on the left, a download link on the right. */
export const WithDownload: Story = {
  name: "With download link",
  args: {
    src: "/posts/gdpr-restricts-fully-automated-decision-flows/decision-and-consequence.svg",
    alt: "A decision and its downstream consequence, as BPMN",
    caption: "Anti-pattern: a decision with no meaningful human review.",
    download:
      "/posts/gdpr-restricts-fully-automated-decision-flows/decision-and-consequence.bpmn",
    downloadLabel: "Download BPMN",
  },
};
