"use client";

import { useEffect, useState } from "react";

/**
 * Table of contents for long-form posts with two presentations:
 *
 *   - **Desktop (xl+):** a sticky right-rail vertical stepper. A thin gold
 *     rule with one dot per section, each dot labelled. Always visible.
 *
 *   - **Mobile / tablet (below xl):** a small floating button bottom-right.
 *     Tap to open a slide-up sheet that contains the same stepper. Tapping
 *     a row scrolls and closes the sheet; tapping the backdrop closes it.
 *
 * Behaviour shared by both modes:
 *   - On mount, queries the surrounding article for `h2[id]` elements
 *     (auto-tagged by rehype-slug) and builds the section list.
 *   - Prepends a synthetic "Introduction" row that scrolls to the top of
 *     the article.
 *   - Appends a "Verdict" row when a `#verdict` element is found in the
 *     article (the VerdictCard component sets this id).
 *   - Uses a scrollspy on every scroll/resize tick to mark the section
 *     whose top is at or above (viewport top + 100px) as active.
 *   - Smooth-scrolls on click without changing the URL hash, so the back
 *     button still returns to the previous page rather than the previous
 *     section.
 */

const INTRO_ID = "__intro";
const VERDICT_ID = "verdict";

type Section = { id: string; title: string };

export function PostToc() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article .prose h2[id]")
    );
    const verdictEl = document.querySelector<HTMLElement>("article #verdict");

    const list: Section[] = [
      { id: INTRO_ID, title: "Introduction" },
      ...headings.map((h) => ({ id: h.id, title: h.textContent ?? h.id })),
      ...(verdictEl ? [{ id: VERDICT_ID, title: "Verdict" }] : []),
    ];
    setSections(list);

    // Scrollspy iterates over real anchored elements only (H2s + Verdict).
    // The synthetic Introduction is the active state when scrolled above
    // the first real target.
    const scrollTargets: HTMLElement[] = verdictEl
      ? [...headings, verdictEl]
      : headings;

    const TRIGGER_OFFSET = 100; // 96px scroll-padding + 4px buffer

    const updateActive = () => {
      // If the post has no anchored targets (Shorts with no H2s and no
      // Verdict), Introduction is always active. The stepper still
      // renders as a single-row indicator.
      if (scrollTargets.length === 0) {
        setActiveId(INTRO_ID);
        return;
      }

      const trigger = window.scrollY + TRIGGER_OFFSET;
      const firstTop =
        scrollTargets[0].getBoundingClientRect().top + window.scrollY;

      if (trigger < firstTop) {
        setActiveId(INTRO_ID);
        return;
      }

      let current: string = scrollTargets[0].id;
      for (const el of scrollTargets) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= trigger) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Lock body scroll while the mobile sheet is open so the page underneath
  // does not scroll behind the panel.
  useEffect(() => {
    if (!isSheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSheetOpen]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!isSheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSheetOpen]);

  if (sections.length === 0) return null;

  const scrollToSection = (id: string) => {
    if (id === INTRO_ID) {
      const article = document.querySelector("article");
      if (article) {
        article.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveId(id);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    closeSheet = false
  ) => {
    e.preventDefault();
    scrollToSection(id);
    if (closeSheet) setIsSheetOpen(false);
  };

  return (
    <>
      {/* ---------- Desktop right-rail (xl+) ---------- */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block fixed top-32 right-6 2xl:right-12 w-56 max-h-[70vh] overflow-y-auto"
      >
        <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold mb-4">
          On this page
        </p>
        <Stepper
          sections={sections}
          activeId={activeId}
          onClick={(e, id) => handleClick(e, id, false)}
        />
      </nav>

      {/* ---------- Mobile floating button (below xl) ---------- */}
      <button
        type="button"
        aria-label="Open table of contents"
        aria-expanded={isSheetOpen}
        onClick={() => setIsSheetOpen(true)}
        className="xl:hidden fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink text-cream shadow-lg ring-1 ring-gold/30 hover:bg-gold-deep transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="8" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="8" y1="18" x2="20" y2="18" />
          <circle cx="4" cy="6" r="1.25" fill="currentColor" />
          <circle cx="4" cy="12" r="1.25" fill="currentColor" />
          <circle cx="4" cy="18" r="1.25" fill="currentColor" />
        </svg>
      </button>

      {/* ---------- Mobile sheet (below xl, only rendered when open) ---------- */}
      {isSheetOpen ? (
        <div
          className="xl:hidden fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close table of contents"
            onClick={() => setIsSheetOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          {/* Sheet */}
          <div className="absolute left-0 right-0 bottom-0 bg-cream-50 border-t border-gold/30 rounded-t-xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
            <header className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold">
                On this page
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsSheetOpen(false)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-ink-mute hover:text-ink hover:bg-ink/5 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </header>
            <Stepper
              sections={sections}
              activeId={activeId}
              onClick={(e, id) => handleClick(e, id, true)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * The shared stepper list. Rendered identically in the desktop rail and the
 * mobile sheet so the visual vocabulary is consistent.
 *
 * Geometry: every dot is centred at x=8 from the li's left edge. The
 * connecting line is 1px wide at x=7.5-8.5. Each row paints two line
 * segments — one above the dot (top:0 → dot centre) and one below (dot
 * centre → bottom) — so the line visually passes through the centre of
 * every dot. The dot is rendered after the lines in DOM order, so it sits
 * on top and occludes the line beneath it.
 *
 * Three row states:
 *
 *   - Visited (above the active row): small filled gold-deep disc. Both
 *     segments of the connecting line render in solid gold-deep so the
 *     stepper reads as a progress bar.
 *   - Active: gold-deep disc with a small cream centre dot, target-style.
 *     The segment above the dot is gold-deep (you got here from a visited
 *     row); the segment below is dim (you have not crossed it yet).
 *   - Upcoming (below the active row): hollow cream disc with a gold
 *     border. Both segments are dim.
 *
 * First row hides its above-segment (line starts at the first dot's
 * centre). Last row hides its below-segment (line ends at the last dot's
 * centre).
 */
function Stepper({
  sections,
  activeId,
  onClick,
}: {
  sections: Section[];
  activeId: string | null;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const activeIndex = sections.findIndex((s) => s.id === activeId);

  // Dot centre y-coordinate (px from li top). All three dot variants are
  // positioned so their centres land here.
  const DOT_CY = 11;

  return (
    <ol className="relative">
      {sections.map((s, i) => {
        const isActive = s.id === activeId;
        const isVisited = activeIndex >= 0 && i < activeIndex;
        const isFirst = i === 0;
        const isLast = i === sections.length - 1;

        // Above the dot: gold-deep if this row or any earlier row is the
        // furthest the reader has reached. Below the dot: gold-deep only if
        // this row has actually been left behind.
        const aboveColour = isVisited || isActive ? "bg-gold-deep" : "bg-gold/25";
        const belowColour = isVisited ? "bg-gold-deep" : "bg-gold/25";

        return (
          <li key={s.id} className="relative pl-7 pb-5 last:pb-0">
            {/* Line segment above the dot (top:0 → dot centre). */}
            {!isFirst ? (
              <span
                aria-hidden
                className={`absolute left-[7.5px] top-0 w-px ${aboveColour}`}
                style={{ height: `${DOT_CY}px` }}
              />
            ) : null}

            {/* Line segment below the dot (dot centre → bottom). */}
            {!isLast ? (
              <span
                aria-hidden
                className={`absolute left-[7.5px] bottom-0 w-px ${belowColour}`}
                style={{ top: `${DOT_CY}px` }}
              />
            ) : null}

            {/* Dot. Rendered after the line segments so it sits on top and
                occludes the line where they overlap. */}
            {isActive ? (
              <span
                aria-hidden
                className="absolute left-[2px] top-[5px] inline-flex items-center justify-center w-3 h-3 rounded-full bg-gold-deep"
              >
                <span className="block w-[3px] h-[3px] rounded-full bg-cream" />
              </span>
            ) : isVisited ? (
              <span
                aria-hidden
                className="absolute left-1 top-[7px] inline-block w-2 h-2 rounded-full bg-gold-deep"
              />
            ) : (
              <span
                aria-hidden
                className="absolute left-1 top-[7px] inline-block w-2 h-2 rounded-full bg-cream-50 border border-gold/60"
              />
            )}

            <a
              href={s.id === INTRO_ID ? "#" : `#${s.id}`}
              onClick={(e) => onClick(e, s.id)}
              className={
                isActive
                  ? "block text-sm font-semibold text-ink leading-snug"
                  : isVisited
                  ? "block text-sm text-ink-soft hover:text-gold-deep leading-snug transition-colors"
                  : "block text-sm text-ink-mute hover:text-gold-deep leading-snug transition-colors"
              }
            >
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
