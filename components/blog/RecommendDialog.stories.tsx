import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { RecommendDialog } from "./RecommendDialog";

const meta: Meta<typeof RecommendDialog> = {
  title: "Overlays / RecommendDialog",
  component: RecommendDialog,
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    onClose: fn(),
    onFollow: fn(),
    href: "/blog/digital-branch-concierge",
    title: "Structure at the edges, freedom in the middle",
    excerpt:
      "One digital branch concierge, built in n8n and LangGraph with other leading automation platforms to follow, to test how agentic AI can work safely inside a European enterprise process.",
    image: "/posts/digital-branch-concierge/og.png",
    heading: "There is a richer agentic build",
    reason:
      "This article is a first look at n8n's AI assistant. The digital branch concierge goes much further: a real AI agent with bounded skills, guardrails, human approval before it acts and an audit trail of every decision.",
    cta: "Read the concierge article",
  },
};
export default meta;

type Story = StoryObj<typeof RecommendDialog>;

/** As it appears on the n8n AI assistant article. */
export const Default: Story = {};

/** Without an image, the card leads with the eyebrow and heading. */
export const NoImage: Story = { args: { image: undefined } };

/** A non-social image (here a wide canvas) is fitted inside the frame, never cropped. */
export const NonCardImage: Story = {
  args: { image: "/posts/digital-branch-concierge/langgraph-steps/00-shape-key.webp" },
};

/** Minimal props: the defaults for eyebrow, heading and call to action. */
export const Defaults: Story = {
  args: { heading: undefined, reason: undefined, cta: undefined, excerpt: undefined, image: undefined },
};

/** Controlled from a button, the way a caller other than the first-visit modal would use it. */
export const Controlled: Story = {
  args: { open: false },
  render: (args) => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <div className="min-h-screen p-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-cream bg-ink"
          >
            Show recommendation
          </button>
          <RecommendDialog
            {...args}
            open={open}
            onClose={() => {
              args.onClose();
              setOpen(false);
            }}
          />
        </div>
      );
    }
    return <Harness />;
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Show recommendation" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    await expect(dialog).toBeVisible();
    await userEvent.click(body.getByRole("button", { name: "Continue to this article" }));
    await expect(args.onClose).toHaveBeenCalled();
    await waitFor(() => expect(body.queryByRole("dialog")).toBeNull());
  },
};
