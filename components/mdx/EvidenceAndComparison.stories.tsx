import type { Meta, StoryObj } from "@storybook/react";
import { EvidenceRecord } from "./EvidenceRecord";
import { ToolComparison, ToolCard } from "./ToolComparison";
import { DefinitionGrid, DefinitionItem, DEFINITION_ICONS } from "./DefinitionGrid";

/**
 * Reusable content blocks for comparison and evidence posts: recorded
 * evidence, per-tool comparison cards and a grid of named principles, each
 * with an optional line icon.
 */
const meta: Meta<typeof EvidenceRecord> = {
  title: "Content / Evidence and comparison",
  component: EvidenceRecord,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof EvidenceRecord>;

/** One recorded run, with the test badges, date and model. */
export const Evidence: Story = {
  render: () => (
    <EvidenceRecord tests="T06 T08" date="15 September 2026" note="deepseek-flash">
      <p>The phone change paused at the pre-action approval until Approve was clicked, then the reply waited for review.</p>
    </EvidenceRecord>
  ),
};

/** A record that is not about specific conversations. */
export const EvidenceWithLabel: Story = {
  name: "Evidence with a label",
  render: () => (
    <EvidenceRecord label="Evaluation runs 1 to 3" date="15 September 2026">
      <p>Run 3 scored every row the runner could score as correct.</p>
    </EvidenceRecord>
  ),
};

/** The same job, handled by three tools. */
export const Comparison: Story = {
  render: () => (
    <ToolComparison label="One concierge, three builds">
      <ToolCard tool="Camunda" title="The boundary drawn on the diagram" status="Coming soon">
        <p>The process is BPMN, so the fixed paths are literally fixed and every human decision is a user task.</p>
      </ToolCard>
      <ToolCard tool="n8n" title="The fastest route to a working concierge">
        <p>The AI Agent node runs the loop, with tools attached as sub-workflows.</p>
      </ToolCard>
    </ToolComparison>
  ),
};

/** Named principles as a two-column grid, each with an optional icon. */
export const Definitions: Story = {
  render: () => (
    <DefinitionGrid>
      <DefinitionItem term="Identity and authorisation first" icon="identity">
        <p>Nothing about a person is retrieved until their identity and permissions are known.</p>
      </DefinitionItem>
      <DefinitionItem term="Guardrails, in and out" icon="shield">
        <p>Input and output checks, layered, because no single check is enough.</p>
      </DefinitionItem>
      <DefinitionItem term="Learning loop, reviewed" icon="loop">
        <p>Traces become proposals, reviewed by a person and evaluated before anything changes.</p>
      </DefinitionItem>
      <DefinitionItem term="Without an icon">
        <p>The icon is optional, and the term lines up the same way without one.</p>
      </DefinitionItem>
    </DefinitionGrid>
  ),
};

/** Every built-in icon, labelled with the name to pass as `icon`. */
export const DefinitionIcons: Story = {
  name: "Definition icons",
  render: () => (
    <DefinitionGrid>
      {DEFINITION_ICONS.map((name) => (
        <DefinitionItem key={name} term={name} icon={name}>
          <p>
            <code>{`icon="${name}"`}</code>
          </p>
        </DefinitionItem>
      ))}
    </DefinitionGrid>
  ),
};
