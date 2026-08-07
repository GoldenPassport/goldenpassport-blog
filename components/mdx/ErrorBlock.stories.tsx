import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorBlock } from "./ErrorBlock";

/**
 * Error / fix pair for troubleshooting sections: the `error` string on a red
 * monospace line with a ✗, and the answer (children) below in a green-tinted
 * block with a tick. Designed to stack inside an Accordion. Children are MDX,
 * so inline code and links work.
 */
const meta: Meta<typeof ErrorBlock> = {
  title: "Content / ErrorBlock",
  component: ErrorBlock,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ErrorBlock>;

/** A single error and its fix. */
export const Default: Story = {
  args: {
    error: "ERR_MODULE_NOT_FOUND: Cannot find module 'src/main.ts'",
    children: (
      <p>
        The file does not exist. Make sure you saved <code>src/main.ts</code>{" "}
        (Step 6) and that it lives in the <code>src</code> folder.
      </p>
    ),
  },
};

/** Several pairs stacked, as they would appear inside a troubleshooting accordion. */
export const Stacked: Story = {
  name: "Stacked pairs",
  render: () => (
    <div>
      <ErrorBlock error="ERR_MODULE_NOT_FOUND: Cannot find module 'src/main.ts'">
        <p>
          The file does not exist. Make sure you saved <code>src/main.ts</code>{" "}
          and that it lives in the <code>src</code> folder.
        </p>
      </ErrorBlock>
      <ErrorBlock error="TypeError: graph.compile is not a function">
        <p>
          You are on an older release. Upgrade with{" "}
          <code>pnpm add langgraph@latest</code> and re-run.
        </p>
      </ErrorBlock>
    </div>
  ),
};
