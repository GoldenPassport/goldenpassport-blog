import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Brand, BrandMark, BrandResponsive } from "./Brand";

const meta: Meta<typeof Brand> = {
  title: "Brand/Lockup",
  component: Brand,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "hero"],
    },
    markOnly: { control: "boolean" },
    stacked: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Brand>;

/** Default lockup (md): mark + single-line wordmark, used in the site header. */
export const Default: Story = {
  args: { size: "md" },
};

/** Compact size, suitable for tight UI corners like footers or badges. */
export const Small: Story = {
  args: { size: "sm" },
};

/** Large size for sub-hero blocks. */
export const Large: Story = {
  args: { size: "lg" },
};

/** Hero size: largest preset, for cover blocks. */
export const Hero: Story = {
  args: { size: "hero" },
};

/** Stacked wordmark over two lines — used on mobile in `BrandResponsive`. */
export const Stacked: Story = {
  args: { size: "sm", stacked: true },
};

/** Just the mark, no wordmark. For icons, splash screens, social cards. */
export const MarkOnly: Story = {
  args: { size: "md", markOnly: true },
};

/**
 * Responsive variant used in the live header:
 *   < 640px  → mark + stacked wordmark, sm size
 *   ≥ 640px  → mark + single-line wordmark, md size
 *   ≥ 1024px → mark + single-line wordmark, lg size
 *
 * Resize the Storybook viewport to see the breakpoints in action.
 */
export const Responsive: StoryObj<typeof BrandResponsive> = {
  render: () => <BrandResponsive />,
};

/** Just the SVG mark on its own. Inherits colour from `currentColor`. */
export const Mark: StoryObj<typeof BrandMark> = {
  render: () => (
    <div className="text-gold-deep">
      <BrandMark className="h-20 w-auto" />
    </div>
  ),
};
