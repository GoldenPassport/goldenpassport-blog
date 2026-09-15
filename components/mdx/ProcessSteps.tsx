/**
 * Interactive process walkthrough: an ordered list of collapsible steps.
 *
 * Each <ProcessStep> is a native <details>/<summary> disclosure, so it works
 * without JavaScript and inherits browser-default a11y (focusable summary,
 * expand/collapse via keyboard). The summary shows a numbered badge, the step
 * title, and a chevron that rotates 180° when open; expanding reveals the
 * description and an optional screenshot (rendered through MdxImage, so it
 * gets the same click-to-enlarge lightbox as every other post image).
 *
 * Visual language matches <Accordion>: cream-50 card, thin gold border,
 * chevron rotate on `group-open`.
 *
 *   <ProcessSteps>
 *
 *   <ProcessStep title="Application submitted"
 *     image="/posts/<slug>/step1.png" imageAlt="..." caption="Optional caption.">
 *
 *   Description markdown here (blank lines required around the JSX boundaries).
 *
 *   </ProcessStep>
 *
 *   </ProcessSteps>
 *
 * Steps auto-number by position; pass `number` on a step to override, or
 * `start` on the list so a second group continues the first's sequence.
 * Registered as <ProcessSteps> / <ProcessStep> in `mdx-components.tsx`.
 */
import React from "react";
import { MdxImage } from "./MdxImage";
import { ChevronSteps } from "./ChevronSteps";
import { StepShots, type Shot } from "./StepShots";

type ProcessStepsProps = {
  children: React.ReactNode;
  /**
   * "accordion" (default): vertical numbered <details> disclosures.
   * "chevron": a horizontal chevron process strip with the selected step's
   * description and image in a panel beneath (see ChevronSteps).
   */
  variant?: "accordion" | "chevron";
  /** Accessible name for the chevron tablist. Ignored for the accordion. */
  label?: string;
  /** Number of the first step (default 1), so several groups can share one running sequence. */
  start?: number;
};

export function ProcessSteps({ children, variant = "accordion", label, start = 1 }: ProcessStepsProps) {
  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<ProcessStepProps>[];

  if (variant === "chevron") {
    const steps = items.map((el) => ({
      title: el.props.title,
      image: el.props.image,
      imageAlt: el.props.imageAlt,
      imageClassName: el.props.imageClassName,
      caption: el.props.caption,
      shots: el.props.shots,
      content: el.props.children,
    }));
    return <ChevronSteps steps={steps} label={label} />;
  }

  return (
    <ol className="not-prose my-8 list-none space-y-3 pl-0">
      {items.map((child, i) =>
        React.cloneElement(child, { number: child.props.number ?? start + i }),
      )}
    </ol>
  );
}

type ProcessStepProps = {
  title: string;
  /** Auto-assigned by <ProcessSteps>; override to force a specific number. */
  number?: number;
  /** Optional screenshot revealed when the step is expanded. */
  image?: string;
  imageAlt?: string;
  /** Override the image classes, e.g. to cap width: "mx-auto max-w-sm ...". */
  imageClassName?: string;
  /** Optional caption under the image. */
  caption?: React.ReactNode;
  /** Optional screenshots opened from small chips under the step text,
   *  instead of shown inline. Good for click-here style walkthrough shots. */
  shots?: Shot[];
  /** Expand on initial render. Defaults to closed. */
  defaultOpen?: boolean;
  /** Anchor id, so a step can be linked to. */
  id?: string;
  /** Short status pill after the title, e.g. "Out of scope". */
  badge?: string;
  /** The question this step answers, shown as a lead-in above the body. */
  question?: string;
  /** What the reader should have at the end of the step, shown as a footer. */
  outcome?: string;
  children: React.ReactNode;
};

export function ProcessStep({
  title,
  number,
  image,
  imageAlt,
  imageClassName,
  caption,
  shots,
  defaultOpen = false,
  id,
  badge,
  question,
  outcome,
  children,
}: ProcessStepProps) {
  return (
    <li className="list-none">
      <details
        id={id}
        open={defaultOpen}
        className="group rounded-lg border border-gold/25 bg-cream-50 overflow-hidden scroll-mt-24"
      >
        <summary className="cursor-pointer select-none list-none flex items-center gap-4 px-5 py-4 hover:bg-cream-200/40 transition-colors">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-deep text-cream font-sans text-sm font-semibold">
            {number}
          </span>
          <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-serif text-lg text-ink">{title}</span>
            {badge ? (
              <span className="rounded-full border border-ink/15 bg-ink/5 px-2 py-0.5 font-sans text-[0.625rem] font-semibold uppercase leading-none tracking-[0.12em] text-ink-mute">
                {badge}
              </span>
            ) : null}
          </span>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-ink-mute transition-transform duration-200 group-open:rotate-180"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="border-t border-gold/15 px-5 py-5">
          {question ? (
            <p className="mb-4 font-serif text-lg italic leading-snug text-ink-soft">
              <span className="mr-2 font-sans text-[0.6875rem] font-semibold not-italic uppercase tracking-[0.18em] text-gold-deep">
                The question
              </span>
              {question}
            </p>
          ) : null}
          <div className="prose prose-lg max-w-none font-serif [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_li]:pl-1 [&_li::marker]:text-gold-deep">
            {children}
          </div>
          {shots?.length ? <StepShots shots={shots} /> : null}
          {image ? (
            <figure className={`mt-5 mb-0 ${imageClassName ?? ""}`}>
              <MdxImage
                src={image}
                alt={imageAlt ?? ""}
                className="w-full h-auto rounded-lg ring-1 ring-gold/10"
              />
              {caption ? (
                <figcaption className="mt-3 text-center text-sm text-ink-mute italic">
                  {caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
          {outcome ? (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-gold/25 bg-gold/[0.07] px-4 py-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-deep text-cream" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="m-0 font-serif text-base leading-relaxed text-ink-soft">
                <span className="mr-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  Outcome
                </span>
                {outcome}
              </p>
            </div>
          ) : null}
        </div>
      </details>
    </li>
  );
}
