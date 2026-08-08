"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Header search: a magnifying-glass button that opens a command-palette style
 * modal for finding posts. Search runs entirely client-side over a lightweight
 * index the (server) Header passes in — no network, no search service.
 *
 * Behaviour:
 *  - Opens on click or ⌘K / Ctrl+K (toggles).
 *  - Filters by title / excerpt / tags / category; all query terms must match,
 *    and matches are ranked (title > tag > excerpt).
 *  - Empty query shows the most recent posts as a starting point.
 *  - Arrow Up/Down move the highlight, Enter opens it, Escape closes.
 *
 * Accessibility mirrors the MdxImage lightbox: real modal (role="dialog",
 * aria-modal), focus moves to the input on open and returns to the trigger on
 * close, body scroll is locked, Escape and backdrop-click close.
 */

export type SearchDoc = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
};

const MAX_RESULTS = 8;
const RECENT_WHEN_EMPTY = 5;

function SearchIcon({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function SiteSearch({ posts }: { posts: SearchDoc[] }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Portal target (document.body) is only safe to reference after mount.
  useEffect(() => setMounted(true), []);

  // Global ⌘K / Ctrl+K toggles the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // While open: lock scroll, focus the input, Escape closes, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  // Reset transient state each time the palette closes.
  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts.slice(0, RECENT_WHEN_EMPTY);
    const terms = q.split(/\s+/).filter(Boolean);
    const scored: { post: SearchDoc; score: number }[] = [];
    for (const p of posts) {
      const title = p.title.toLowerCase();
      const excerpt = p.excerpt.toLowerCase();
      const tags = p.tags.map((t) => t.toLowerCase());
      const category = p.category.toLowerCase();
      let score = 0;
      let matchesAll = true;
      for (const term of terms) {
        const inTitle = title.includes(term);
        const inTag = tags.some((t) => t.includes(term));
        const inExcerpt = excerpt.includes(term);
        const inCategory = category.includes(term);
        if (!inTitle && !inTag && !inExcerpt && !inCategory) {
          matchesAll = false;
          break;
        }
        score += (inTitle ? 3 : 0) + (inTag ? 2 : 0) + (inExcerpt ? 1 : 0) + (inCategory ? 1 : 0);
      }
      if (matchesAll) scored.push({ post: p, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_RESULTS).map((s) => s.post);
  }, [query, posts]);

  // Keep the highlighted index in range as results change.
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, results.length - 1)));
  }, [results.length]);

  const go = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/blog/${slug}`);
    },
    [router],
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[activeIndex];
      if (hit) go(hit.slug);
    }
  };

  const showingRecent = query.trim() === "";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search posts"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex items-center justify-center rounded-full p-1.5 text-ink-soft hover:text-gold-deep hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
      >
        <SearchIcon />
      </button>

      {mounted && open
        ? createPortal(
        <div
          role="presentation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-sm p-4 pt-[12vh]"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search posts"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-gold/25 bg-cream-50 shadow-2xl ring-1 ring-gold/10"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 border-b border-gold/20 px-4">
              <SearchIcon className="shrink-0 text-ink-mute" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search posts"
                aria-label="Search posts"
                role="combobox"
                aria-expanded="true"
                aria-controls="site-search-results"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent py-4 font-serif text-lg text-ink placeholder:text-ink-mute focus:outline-none"
              />
              <kbd className="shrink-0 hidden sm:inline-block rounded border border-gold/30 bg-cream-200/60 px-1.5 py-0.5 font-sans text-[0.65rem] text-ink-mute">
                Esc
              </kbd>
            </div>

            {/* Results */}
            {showingRecent ? (
              <p className="px-4 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-mute">
                Recent
              </p>
            ) : null}
            {results.length > 0 ? (
              <ul id="site-search-results" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {results.map((p, i) => (
                  <li key={p.slug} role="option" aria-selected={i === activeIndex}>
                    <Link
                      href={`/blog/${p.slug}`}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`block rounded-lg px-3 py-2.5 transition-colors ${
                        i === activeIndex ? "bg-gold/12" : "hover:bg-cream-200/50"
                      }`}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="min-w-0 flex-1 truncate font-serif text-base text-ink">
                          {p.title}
                        </span>
                        <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                          {p.category}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-ink-mute">
                        {p.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-ink-mute">
                No posts match &ldquo;{query.trim()}&rdquo;.
              </p>
            )}
          </div>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}
