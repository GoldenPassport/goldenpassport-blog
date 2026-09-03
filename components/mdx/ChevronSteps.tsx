"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MdxImage } from "./MdxImage";

/**
 * Horizontal chevron process strip with a detail panel beneath it.
 *
 * Steps render as interlocking arrow-shaped tabs (CSS clip-path), numbered
 * and titled. Selecting one shows its description and optional screenshot in
 * the panel below. Implemented as a proper tab pattern: roving tabindex,
 * arrow-key / Home / End navigation, aria-selected + aria-controls.
 *
 * Not registered in MDX directly: <ProcessSteps variant="chevron"> maps its
 * <ProcessStep> children into `steps` and renders this.
 *
 * Small screens: the strip scrolls horizontally inside its own container
 * (overflow-x-auto), so it never widens the page.
 */

export type ChevronStepData = {
  title: string;
  image?: string;
  imageAlt?: string;
  /** Wrapper classes to cap the image width, e.g. "mx-auto max-w-sm". */
  imageClassName?: string;
  caption?: React.ReactNode;
  content: React.ReactNode;
};

const NOTCH = "1.25rem";
// First chevron has a flat left edge; the rest carry a notch that the
// previous chevron's tip sits inside (the classic interlock).
const FIRST_CLIP = `polygon(0 0, calc(100% - ${NOTCH}) 0, 100% 50%, calc(100% - ${NOTCH}) 100%, 0 100%)`;
const MID_CLIP = `polygon(0 0, calc(100% - ${NOTCH}) 0, 100% 50%, calc(100% - ${NOTCH}) 100%, 0 100%, ${NOTCH} 50%)`;

export function ChevronSteps({
  steps,
  label = "Process steps",
}: {
  steps: ChevronStepData[];
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // On small screens the strip scrolls horizontally; keep the selected
  // chevron in view when it changes (no-op when everything already fits).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tabRefs.current[active]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [active]);

  if (steps.length === 0) return null;

  const focusTab = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = steps.length - 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(i === last ? 0 : i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(i === 0 ? last : i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(last);
    }
  };

  const step = steps[active];

  return (
    <div className="not-prose my-8">
      <div
        role="tablist"
        aria-label={label}
        className="flex overflow-x-auto -mx-1 px-1 pb-1 [scrollbar-width:thin] snap-x snap-proximity"
      >
        {steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              style={{ clipPath: i === 0 ? FIRST_CLIP : MID_CLIP }}
              className={[
                // Fixed-width, scrollable on small screens; equal-width on md+.
                "relative shrink-0 min-w-[11rem] md:shrink md:flex-1 md:min-w-0 snap-start",
                i === 0 ? "pl-4" : "-ml-3 pl-8",
                "flex items-center gap-3 py-3 pr-8 text-left transition-colors duration-300 ease-out focus:outline-none",
                // Touch: no text selection on tap, no grey tap flash.
                "select-none [-webkit-tap-highlight-color:transparent]",
                selected ? "bg-gold-deep text-cream" : "bg-cream-200 text-ink hover:bg-gold/30",
                // clip-path clips outlines, so the focus ring is drawn inset.
                "focus-visible:shadow-[inset_0_0_0_3px_#0F1B2D]",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full font-sans text-xs font-semibold",
                  selected ? "bg-cream text-gold-deep" : "bg-gold-deep text-cream",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span className="font-serif text-sm md:text-base leading-tight">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Keyed on the active step so each change remounts the panel and
          replays the ease-in slide (skipped under prefers-reduced-motion). */}
      <div
        key={active}
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-4 rounded-lg border border-gold/25 bg-cream-50 px-5 py-5 motion-safe:animate-step-in"
      >
        <div className="prose prose-lg max-w-none font-serif [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {step.content}
        </div>
        {step.image ? (
          <figure className={`mt-5 mb-0 ${step.imageClassName ?? ""}`}>
            <MdxImage
              src={step.image}
              alt={step.imageAlt ?? ""}
              className="w-full h-auto rounded-lg ring-1 ring-gold/10"
            />
            {step.caption ? (
              <figcaption className="mt-3 text-center text-sm text-ink-mute italic">
                {step.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </div>
  );
}
