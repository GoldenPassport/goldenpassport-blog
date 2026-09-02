import type { MDXComponents } from "mdx/types";
import { MdxImage } from "@/components/mdx/MdxImage";
import { Figure } from "@/components/mdx/Figure";
import { Republished, PullQuote, Callout } from "@/components/mdx/Asides";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { TldrCard, VerdictCard, CtaCard } from "@/components/mdx/CalloutCard";
import { Accordion } from "@/components/mdx/Accordion";
import { ProcessSteps, ProcessStep } from "@/components/mdx/ProcessSteps";
import { Terms, Calculations, References } from "@/components/mdx/EndMatter";
import { Timeline, TimelineEntry } from "@/components/mdx/Timeline";
import { DownloadsChart } from "@/components/mdx/DownloadsChart";
import { NumberedList, NumberedItem } from "@/components/mdx/NumberedList";
import { Chips } from "@/components/mdx/Chips";
import { TickList, TickItem } from "@/components/mdx/TickList";
import { CrossList, CrossItem } from "@/components/mdx/CrossList";
import { DesignCardGrid, DesignCard, DesignCardMore } from "@/components/mdx/DesignCard";
import { BarChart } from "@/components/mdx/BarChart";
import { ReviewDashboard } from "@/components/mdx/ReviewDashboard";
import { TriageGraphDiagram } from "@/components/mdx/TriageGraphDiagram";
import { Terminal } from "@/components/mdx/Terminal";
import { ErrorBlock } from "@/components/mdx/ErrorBlock";

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
    Republished,
    PullQuote,
    Callout,
    pre: CodeBlock,
    TldrCard,
    VerdictCard,
    CtaCard,
    Accordion,
    ProcessSteps,
    ProcessStep,
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
