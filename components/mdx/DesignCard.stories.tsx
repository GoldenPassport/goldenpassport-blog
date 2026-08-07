import type { Meta, StoryObj } from "@storybook/react";
import { DesignCardGrid, DesignCard, DesignCardMore } from "./DesignCard";

/**
 * Three-card "where the design comes from" layout. `DesignCardGrid` is the
 * responsive wrapper (1 / 2 / 3 columns); each `DesignCard` shows source, year,
 * title, and a summary, with an optional `DesignCardMore` (native `<details>`)
 * for the deeper explanation. Children render inside prose.
 */
const meta: Meta<typeof DesignCardGrid> = {
  title: "Content / DesignCard",
  component: DesignCardGrid,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof DesignCardGrid>;

/** The full three-up grid with expandable "read more" sections. */
export const Grid: Story = {
  render: () => (
    <DesignCardGrid>
      <DesignCard
        title="Pregel"
        source="Google, 2009"
        tagline="Vertex-centric Bulk Synchronous Parallel"
        link="https://research.google/pubs/pregel-a-system-for-large-scale-graph-processing/"
        linkLabel="Pregel paper"
      >
        <p>Graph computation as a sequence of synchronised supersteps.</p>
        <DesignCardMore>
          <p>
            Each vertex runs the same function, reads messages from the previous
            superstep, and emits messages for the next, the same model that
            LangGraph uses for node execution.
          </p>
        </DesignCardMore>
      </DesignCard>

      <DesignCard
        title="Actor model"
        source="Hewitt, 1973"
        tagline="Isolated state, message passing"
      >
        <p>Independent actors that communicate only by messages.</p>
        <DesignCardMore>
          <p>No shared memory; each actor processes one message at a time.</p>
        </DesignCardMore>
      </DesignCard>

      <DesignCard
        title="Dataflow"
        source="Kahn, 1974"
        tagline="Deterministic process networks"
      >
        <p>Computation as nodes connected by channels of data.</p>
      </DesignCard>
    </DesignCardGrid>
  ),
};

/** A single card in isolation, expanded state available via "Read more". */
export const SingleCard: Story = {
  name: "Single card",
  render: () => (
    <DesignCardGrid>
      <DesignCard
        title="Pregel"
        source="Google, 2009"
        tagline="Vertex-centric Bulk Synchronous Parallel"
        link="https://research.google/pubs/pregel-a-system-for-large-scale-graph-processing/"
        linkLabel="Pregel paper"
        wide
      >
        <p>Graph computation as a sequence of synchronised supersteps.</p>
        <DesignCardMore>
          <p>The deeper explanation, hidden until the section is expanded.</p>
        </DesignCardMore>
      </DesignCard>
    </DesignCardGrid>
  ),
};
