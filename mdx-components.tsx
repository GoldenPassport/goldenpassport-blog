import type { MDXComponents } from "mdx/types";
import { MdxImage } from "@/components/MdxImage";
import { Figure } from "@/components/Figure";
import { CodeBlock } from "@/components/CodeBlock";
import { TldrCard, VerdictCard, CtaCard } from "@/components/CalloutCard";
import { Accordion } from "@/components/Accordion";
import { Terms, Calculations, References } from "@/components/EndMatter";
import { Timeline, TimelineEntry } from "@/components/Timeline";
import { DownloadsChart } from "@/components/DownloadsChart";
import { NumberedList, NumberedItem } from "@/components/NumberedList";
import { Chips } from "@/components/Chips";
import { TickList, TickItem } from "@/components/TickList";
import { CrossList, CrossItem } from "@/components/CrossList";
import { DesignCardGrid, DesignCard, DesignCardMore } from "@/components/DesignCard";
import { BarChart } from "@/components/BarChart";
import { ReviewDashboard } from "@/components/ReviewDashboard";
import { TriageGraphDiagram } from "@/components/TriageGraphDiagram";
import { Terminal } from "@/components/Terminal";
import { ErrorBlock } from "@/components/ErrorBlock";

/**
 * Required by @next/mdx in App Router. Exports the components that MDX pages
 * can use. Overrides:
 *
 * - `img`            → MdxImage   (lightbox on click)
 * - `pre`            → CodeBlock  (adds a copy-to-clipboard button)
 * - <TldrCard>       → ink callout used at the top of a post to summarise
 * - <VerdictCard>    → sage-green callout used for end-of-post conclusions
 * - <CtaCard>        → blue callout used for end-of-post CTAs
 * - <Accordion>      → collapsible disclosure (Terms, References, etc.)
 * - <Timeline>       → vertical timeline wrapper for short-history sections
 * - <TimelineEntry>  → single entry inside a <Timeline>
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: MdxImage,
    Figure,
    pre: CodeBlock,
    TldrCard,
    VerdictCard,
    CtaCard,
    Accordion,
    Terms,
    Calculations,
    References,
    Timeline,
    TimelineEntry,
    DownloadsChart,
    NumberedList,
    NumberedItem,
    Chips,
    TickList,
    TickItem,
    CrossList,
    CrossItem,
    DesignCardGrid,
    DesignCard,
    DesignCardMore,
    BarChart,
    ReviewDashboard,
    TriageGraphDiagram,
    Terminal,
    ErrorBlock,
  };
}
