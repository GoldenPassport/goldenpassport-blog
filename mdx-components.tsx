import type { MDXComponents } from "mdx/types";
import { PostImage } from "@/components/mdx/PostImage";
import { Figure, FigureAside } from "@/components/mdx/Figure";
import { Republished, PullQuote, Callout } from "@/components/mdx/Asides";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { TldrCard, VerdictCard, CtaCard } from "@/components/mdx/CalloutCard";
import { Accordion } from "@/components/mdx/Accordion";
import { ProcessSteps, ProcessStep } from "@/components/mdx/ProcessSteps";
import { Terms, Calculations, References } from "@/components/mdx/EndMatter";
import { Timeline, TimelineEntry } from "@/components/mdx/Timeline";
import { DownloadsChart } from "@/components/mdx/DownloadsChart";
import { NumberedList, NumberedItem } from "@/components/mdx/NumberedList";
import { Badge, Chips } from "@/components/mdx/Chips";
import { TickList, TickItem } from "@/components/mdx/TickList";
import { CrossList, CrossItem } from "@/components/mdx/CrossList";
import { DesignCardGrid, DesignCard, DesignCardMore } from "@/components/mdx/DesignCard";
import { BarChart } from "@/components/mdx/BarChart";
import { ReviewDashboard } from "@/components/mdx/ReviewDashboard";
import { TriageGraphDiagram } from "@/components/mdx/TriageGraphDiagram";
import { Terminal } from "@/components/mdx/Terminal";
import { ErrorBlock } from "@/components/mdx/ErrorBlock";
import { DemoLinks, DemoLink } from "@/components/mdx/DemoLinks";
import { StepShots, Shot } from "@/components/mdx/StepShots";
import { AgentWorkflowEquation } from "@/components/mdx/AgentWorkflowEquation";
import { ScrollCards, ScrollCard } from "@/components/mdx/ScrollCards";
import { TestConversations, TestConversation } from "@/components/mdx/TestConversations";
import { Scorecard, ScorecardRow, ScorecardSummary } from "@/components/mdx/Scorecard";
import { TestId } from "@/components/mdx/TestId";
import { HeadingH2, HeadingH3 } from "@/components/mdx/HeadingAnchor";
import { EvidenceRecord } from "@/components/mdx/EvidenceRecord";
import { ToolComparison, ToolCard } from "@/components/mdx/ToolComparison";
import { DefinitionGrid, DefinitionItem } from "@/components/mdx/DefinitionGrid";
import { DownloadCallout } from "@/components/mdx/DownloadCallout";

/**
 * Required by @next/mdx in App Router. Exports the components that MDX pages
 * can use. Overrides:
 *
 * - `img`            → PostImage  (reserved size, fade-in, lightbox on click)
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
    img: PostImage,
    h2: HeadingH2,
    h3: HeadingH3,
    Figure,
    FigureAside,
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
    Badge,
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
    DemoLinks,
    DemoLink,
    StepShots,
    Shot,
    AgentWorkflowEquation,
    ScrollCards,
    ScrollCard,
    TestConversations,
    TestConversation,
    Scorecard,
    ScorecardRow,
    ScorecardSummary,
    TestId,
    EvidenceRecord,
    ToolComparison,
    ToolCard,
    DefinitionGrid,
    DefinitionItem,
    DownloadCallout,
  };
}
