"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * The Topics chip row on /blog. Server hands us a fully-built list of chips
 * (label + href + active flag) plus an optional clearHref when a tag filter
 * is active.
 *
 * Collapsed by default: the chip row is clipped to one row's height
 * (`max-h-8`, see COLLAPSED_MAX_PX below). A fade-out gradient hints at
 * hidden content. A "Show all topics" toggle expands the row to its
 * natural height; clicking again collapses it.
 *
 * Overflow detection is JS-based via ResizeObserver. The toggle is only
 * rendered if the full chip row is taller than the collapsed clip, so
 * categories with few tags don't see a pointless button.
 */

const COLLAPSED_MAX_PX = 32; // must match the `max-h-8` Tailwind class below

export type TopicChip = { label: string; href: string; active: boolean };

export function TopicsFilter({
  topics,
  clearHref,
}: {
  topics: TopicChip[];
  clearHref: string | null;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    // scrollHeight reports the natural (uncliped) content height, regardless
    // of the max-height we apply. Compare against the collapsed clip target
    // to know whether there's anything hidden.
    const measure = () => setHasOverflow(el.scrollHeight > COLLAPSED_MAX_PX + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [topics]);

  if (!topics.length) return null;

  return (
    <div className="mt-4">
      <p className="text-xs tracking-[0.18em] uppercase text-ink-mute mb-2">Topics</p>
      <div className="relative">
        <nav
          ref={navRef}
          aria-label="Filter by tag"
          className={`flex flex-wrap items-center gap-1.5 ${
            expanded ? "" : "max-h-8 overflow-hidden"
          }`}
        >
          {topics.map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? "true" : undefined}
              className={`text-[11px] px-2 py-1 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 focus-visible:ring-offset-2 ${
                active
                  ? "bg-ink text-cream border-ink"
                  : "bg-cream-200 text-ink-soft border-gold/15 hover:bg-cream-50 hover:border-gold-deep hover:text-gold-deep focus-visible:bg-cream-50 focus-visible:border-gold-deep focus-visible:text-gold-deep"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        {!expanded && hasOverflow ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-transparent to-cream"
          />
        ) : null}
      </div>

      {/* Controls row: Clear (when a tag is active) and Show all/fewer toggle.
          Lives outside the truncatable nav so both stay reachable when the
          chip row is collapsed. */}
      {clearHref || hasOverflow || expanded ? (
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
          {clearHref ? (
            <Link
              href={clearHref}
              className="text-ink-mute underline underline-offset-4 hover:text-gold-deep"
            >
              Clear
            </Link>
          ) : null}
          {hasOverflow || expanded ? (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-ink-mute hover:text-gold-deep underline underline-offset-4"
            >
              {expanded ? "Show fewer topics" : "Show all topics"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
