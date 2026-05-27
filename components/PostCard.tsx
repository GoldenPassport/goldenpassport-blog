"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

/** Maximum number of tags shown before collapsing the rest behind a "+N more" affordance. */
const MAX_VISIBLE_TAGS = 2;

/**
 * Subtle "you've read this" marker. Renders as right-aligned text with a
 * small checkmark, not a pill badge — so it sits quietly in the card
 * header without competing with the category / pinned badges on the left.
 */
export function ReadIndicator() {
  return (
    <span
      title="You've read this"
      className="inline-flex items-center gap-1 text-[11px] text-ink-mute italic"
    >
      <svg
        viewBox="0 0 24 24"
        width="11"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Read
    </span>
  );
}

/**
 * Series marker. Shown alongside the category badge to signal "this post
 * is part of an ongoing series" (e.g. "Automation Review"). Visually
 * distinct from category: outlined, ink-toned, not a solid pill.
 */
export function SeriesBadge({ name }: { name: string }) {
  return (
    <span
      title={`Part of the ${name} series`}
      className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-ink/25 text-ink-soft bg-cream-50 rounded-full"
    >
      <svg
        viewBox="0 0 24 24"
        width="9"
        height="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Three small stacked horizontal lines hinting at a series / chapters. */}
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
      {name}
    </span>
  );
}

export function PinnedBadge() {
  return (
    <span
      title="Pinned post"
      // bg-cream-50 (#FEFCF8) keeps gold-deep text comfortably above the
      // WCAG AA 4.5:1 threshold for this small-text badge. The stronger
      // border preserves the gold accent that bg-gold/10 used to provide.
      className="inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-gold-deep/60 text-gold-deep bg-cream-50 rounded-full"
    >
      <svg
        viewBox="0 0 24 24"
        width="10"
        height="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="17" x2="12" y2="22" />
        <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
      </svg>
      Pinned
    </span>
  );
}

/**
 * Solid-fill category pills, designed to be legible at a glance during a
 * fast scroll. Each category has a distinct hue:
 *   - Business: deep gold       (the warm, considered track)
 *   - Tech:     ink / navy      (the engineering track)
 *   - Shorts:   bright gold     (the snackable track)
 */
const CATEGORY_STYLES: Record<PostMeta["category"], string> = {
  Business: "bg-gold-deep text-cream border-gold-deep",
  Tech: "bg-ink text-cream border-ink",
  Shorts: "bg-gold-light text-ink border-gold-light",
};

export function CategoryBadge({ category }: { category: PostMeta["category"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase px-2 py-1 border rounded-full ${CATEGORY_STYLES[category]}`}
    >
      {category === "Shorts" ? (
        <svg
          viewBox="0 0 24 24"
          width="9"
          height="9"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : null}
      {category}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-cream-200 text-ink-soft border border-gold/15">
      {children}
    </span>
  );
}

/**
 * Tag list with optional truncation.
 *
 * - `linkable`: each tag becomes a link to /blog?tag=…
 * - `truncate`: when true and there are more than MAX_VISIBLE_TAGS, hides
 *   the overflow behind a "+N more" button. Used on post cards in lists
 *   to keep cards visually calm when a post carries many tags. The post
 *   detail page leaves this false so the full set is visible.
 */
export function TagList({
  tags,
  linkable = false,
  truncate = false,
}: {
  tags: string[];
  linkable?: boolean;
  truncate?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  if (!tags.length) return null;

  const willTruncate = truncate && !expanded && tags.length > MAX_VISIBLE_TAGS;
  const visible = willTruncate ? tags.slice(0, MAX_VISIBLE_TAGS) : tags;
  const hidden = tags.length - MAX_VISIBLE_TAGS;

  return (
    <ul className="mt-3 flex flex-wrap items-center gap-1.5">
      {visible.map((t) => (
        <li key={t}>
          {linkable ? (
            <Link
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-cream-200 text-ink-soft border border-gold/15 transition-colors hover:bg-cream-50 hover:border-gold-deep hover:text-gold-deep focus-visible:bg-cream-50 focus-visible:border-gold-deep focus-visible:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 focus-visible:ring-offset-2"
            >
              {t}
            </Link>
          ) : (
            <Tag>{t}</Tag>
          )}
        </li>
      ))}
      {willTruncate ? (
        <li>
          <button
            type="button"
            // The card is wrapped in a Link, so a raw click on this button
            // would bubble up and navigate. preventDefault + stopPropagation
            // keeps the click as a pure UI affordance.
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(true);
            }}
            aria-label={`Show ${hidden} more tag${hidden === 1 ? "" : "s"}`}
            className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-cream-50 text-gold-deep border border-gold/30 hover:bg-cream hover:border-gold-deep transition-colors"
          >
            +{hidden} more
          </button>
        </li>
      ) : null}
    </ul>
  );
}

export function PostCard({ post, read = false }: { post: PostMeta; read?: boolean }) {
  // Pinned is suppressed once the reader has read the post: it stops being
  // a recommendation for them. (The sort handled at the list level demotes
  // the post to date-position to match.)
  const showPinned = post.pinned && !read;
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block py-6 border-b border-gold/15">
        <div className="flex items-center flex-wrap gap-3 mb-3">
          {showPinned ? <PinnedBadge /> : null}
          <CategoryBadge category={post.category} />
          {/* SeriesBadge intentionally not rendered: posts in a series carry
              the series name in their title (e.g. "Automation Review: ...")
              so a badge here would just repeat the title. */}
          <span className="text-xs text-ink-mute">
            {post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </span>
          {read ? (
            <span className="ml-auto">
              <ReadIndicator />
            </span>
          ) : null}
        </div>
        <h3 className="font-serif text-2xl text-ink group-hover:text-gold-deep transition-colors">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2 text-ink-soft max-w-prose">{post.excerpt}</p>
        ) : null}
        <TagList tags={post.tags} truncate />
      </Link>
    </article>
  );
}
