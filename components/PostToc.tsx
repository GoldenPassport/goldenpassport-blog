"use client";

import { useEffect, useState } from "react";

/**
 * Sticky right-rail table of contents for long-form posts. Visual style is a
 * vertical stepper: a thin gold rule with one dot per H2 section, each dot
 * labelled with the section title.
 *
 * Behaviour:
 *   - On mount, queries the surrounding article for `h2[id]` elements and
 *     builds the section list automatically. The ids come from rehype-slug
 *     (configured in next.config.mjs).
 *   - Uses IntersectionObserver to track which section is currently in view
 *     and highlights its row in gold.
 *   - Smooth-scrolls on click without changing the URL hash (so the back
 *     button still returns to the previous page rather than the previous
 *     section).
 *
 * Layout: rendered as a sibling of the article element, positioned fixed on
 * desktop (≥ xl breakpoint) and hidden on smaller screens. The article keeps
 * its centred max-w-3xl layout; on xl viewports the gutter to the right is
 * roughly 16rem, which is exactly what the stepper occupies.
 */
export function PostToc() {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Collect every H2 inside the surrounding article that rehype-slug has
    // tagged with an id. We exclude the Terms / References accordion h2s by
    // scoping to the .prose container that wraps the MDX output, which sits
    // above the trailing accordions.
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article .prose h2[id]")
    );

    const list = headings.map((h) => ({
      id: h.id,
      title: h.textContent ?? h.id,
    }));
    setSections(list);

    if (list.length === 0) return;

    // Highlight the heading nearest the top of the viewport. rootMargin tunes
    // the trigger band so a section is "active" once its heading reaches the
    // top 25% of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry currently closest to the top among those intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (sections.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed top-32 right-6 2xl:right-12 w-56 max-h-[70vh] overflow-y-auto"
    >
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold mb-4">
        On this page
      </p>
      <ol className="relative space-y-3 border-l-2 border-gold/30 pl-5">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id} className="relative">
              {/* Dot. Sits on the rule via -translate-x. Active row gets a
                  larger filled gold-deep dot; inactive rows get a smaller
                  hollow dot. */}
              <span
                aria-hidden
                className={
                  isActive
                    ? "absolute -left-[1.55rem] top-1.5 inline-block h-3 w-3 rounded-full bg-gold-deep ring-4 ring-gold/25"
                    : "absolute -left-[1.4rem] top-2 inline-block h-2 w-2 rounded-full bg-cream border border-gold/50"
                }
              />
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={
                  isActive
                    ? "block text-sm font-semibold text-ink leading-snug"
                    : "block text-sm text-ink-mute hover:text-gold-deep leading-snug transition-colors"
                }
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
