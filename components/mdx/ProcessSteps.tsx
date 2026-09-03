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
 * Steps auto-number by position; pass `number` on a step to override.
 * Registered as <ProcessSteps> / <ProcessStep> in `mdx-components.tsx`.
 */
import React from "react";
import { MdxImage } from "./MdxImage";
import { ChevronSteps } from "./ChevronSteps";

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
};

export function ProcessSteps({ children, variant = "accordion", label }: ProcessStepsProps) {
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
      content: el.props.children,
    }));
    return <ChevronSteps steps={steps} label={label} />;
  }

  return (
    <ol className="not-prose my-8 list-none space-y-3 pl-0">
      {items.map((child, i) =>
        React.cloneElement(child, { number: child.props.number ?? i + 1 }),
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
  /** Expand on initial render. Defaults to closed. */
  defaultOpen?: boolean;
  /** Anchor id, so a step can be linked to. */
  id?: string;
  children: React.ReactNode;
};

export function ProcessStep({
  title,
  number,
  image,
  imageAlt,
  imageClassName,
  caption,
  defaultOpen = false,
  id,
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
          <span className="flex-1 font-serif text-lg text-ink">{title}</span>
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
          <div className="prose prose-lg max-w-none font-serif [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
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
        </div>
      </details>
    </li>
  );
}
