import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Terminal } from "./Terminal";

/**
 * Terminal-styled command box: dark ink background, cream monospace, one
 * prompt-prefixed line per command, and a copy-to-clipboard button. The
 * `prompt` defaults to `$`; override it for a REPL (`>>>`) or PowerShell (`>`).
 * Long commands scroll horizontally rather than wrapping mid-token.
 */
const meta: Meta<typeof Terminal> = {
  title: "Content / Terminal",
  component: Terminal,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Terminal>;

/** A clone-install-run sequence with the default `$` prompt. */
export const Default: Story = {
  args: {
    commands: [
      "git clone https://github.com/GoldenPassport/automation-review-examples.git",
      "cd automation-review-examples/langgraph-triage-demo-answer",
      "pnpm install",
      "pnpm dev",
    ],
  },
};

/** A Python REPL, using a custom `>>>` prompt. */
export const ReplPrompt: Story = {
  name: "Custom prompt (REPL)",
  args: {
    prompt: ">>>",
    commands: [
      "from langgraph.graph import StateGraph",
      "graph = StateGraph(State)",
      "app = graph.compile()",
    ],
  },
};
