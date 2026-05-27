import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Content / CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof CodeBlock>;

const tsx = `import { ThemeProvider, AppShell, goldenPassport } from "@golden-passport/ds-patternfly";

export default function App() {
  return (
    <ThemeProvider brand={goldenPassport}>
      <AppShell>{/* your screens */}</AppShell>
    </ThemeProvider>
  );
}`;

const shell = `pnpm install
pnpm storybook
pnpm build`;

/** Default code block. The copy button lives in the top-right corner. */
export const Default: Story = {
  render: () => (
    <div className="prose prose-lg max-w-prose font-serif">
      <CodeBlock>
        <code className="language-tsx">{tsx}</code>
      </CodeBlock>
    </div>
  ),
};

/** Short shell command — same component, less content. */
export const Shell: Story = {
  render: () => (
    <div className="prose prose-lg max-w-prose font-serif">
      <CodeBlock>
        <code className="language-sh">{shell}</code>
      </CodeBlock>
    </div>
  ),
};
