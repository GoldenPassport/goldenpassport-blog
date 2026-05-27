import type { MDXComponents } from "mdx/types";
import { MdxImage } from "@/components/MdxImage";
import { CodeBlock } from "@/components/CodeBlock";
import { TldrCard, VerdictCard, CtaCard } from "@/components/CalloutCard";
import { Accordion } from "@/components/Accordion";
import { Timeline, TimelineEntry } from "@/components/Timeline";
import { DownloadsChart } from "@/components/DownloadsChart";
import { NumberedList, NumberedItem } from "@/components/NumberedList";
import { TickList, TickItem } from "@/components/TickList";
import { CrossList, CrossItem } from "@/components/CrossList";
import { DesignCardGrid, DesignCard, DesignCardMore } from "@/components/DesignCard";
import { BarChart } from "@/components/BarChart";
import { ReviewDashboard } from "@/components/ReviewDashboard";

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
    pre: CodeBlock,
    TldrCard,
    VerdictCard,
    CtaCard,
    Accordion,
    Timeline,
    TimelineEntry,
    DownloadsChart,
    NumberedList,
    NumberedItem,
    TickList,
    TickItem,
    CrossList,
    CrossItem,
    DesignCardGrid,
    DesignCard,
    DesignCardMore,
    BarChart,
    ReviewDashboard,
  };
}
