import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MdxImage } from "./MdxImage";

const meta: Meta<typeof MdxImage> = {
  title: "Content / MdxImage",
  component: MdxImage,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof MdxImage>;

/**
 * Drop-in `<img>` replacement used by MDX content.
 * Click to open the full-screen lightbox. Escape or backdrop click closes it.
 *
 * Storybook serves files in `public/` at the root, so the path below loads
 * the brand mark we already have committed.
 */
export const Default: Story = {
  render: () => (
    <MdxImage
      src="/brand/golden-passport-mark.svg"
      alt="Golden Passport mark — click to enlarge"
      className="h-24 w-auto"
    />
  ),
};

export const InProseContext: Story = {
  name: "In a prose context",
  render: () => (
    <article className="prose prose-lg max-w-prose font-serif">
      <p>
        Some lead-in copy that sits above the image, to show how the click target
        looks inline with the rest of a blog post.
      </p>
      <figure>
        <MdxImage
          src="/brand/golden-passport-mark.svg"
          alt="Golden Passport mark"
          className="w-full h-auto rounded-lg ring-1 ring-gold/10"
        />
        <figcaption className="mt-3 text-center text-sm text-ink-mute italic">
          The brand mark
        </figcaption>
      </figure>
      <p>And the article continues here.</p>
    </article>
  ),
};
