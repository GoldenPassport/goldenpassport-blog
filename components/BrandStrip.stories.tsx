import type { Meta, StoryObj } from "@storybook/react";
import { BrandStrip } from "./BrandStrip";

const meta: Meta<typeof BrandStrip> = {
  title: "Brand / BrandStrip",
  component: BrandStrip,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BrandStrip>;

/**
 * The two-row brand strip used on the About page. Top row: software
 * companies where Luke built his craft (with citation chips). Bottom row:
 * hyperscalers he has partnered with.
 *
 * Logos are loaded from `/brands/*` — paths resolve against the
 * `staticDirs: ["../public"]` config in `.storybook/main.ts`.
 */
export const Default: Story = {};
