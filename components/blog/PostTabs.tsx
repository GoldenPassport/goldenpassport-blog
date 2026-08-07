import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

/**
 * Tab navigation rendered above the title on posts that belong to a `group`.
 *
 * Style: traditional underline-tabs sitting on a horizontal divider. The
 * active tab gets a gold-deep underline that overlaps the divider, the
 * inactive tabs sit on a transparent underline so heights stay equal.
 *
 * Used to split a long post into multiple linked views (e.g. an Automation
 * Review with separate "Article" and "Demo" tabs). Each tab is a real URL,
 * so each view is shareable, has its own metadata, and is independently
 * SEO-indexable. Posts opt in via `group` + `groupLabel` + `groupOrder`
 * frontmatter.
 *
 * Returns null if fewer than two siblings exist, so single-tab groups do
 * not render a pointless lone underline.
 */
export function PostTabs({
  siblings,
  currentSlug,
}: {
  siblings: PostMeta[];
  currentSlug: string;
}) {
  if (siblings.length < 2) return null;

  return (
    <nav aria-label="Sections of this review" className="not-prose mb-6 border-b border-gold/20">
      {/* -mb-px pulls each tab's bottom border down 1px so it visually overlaps
          the parent <nav>'s bottom border, giving that clean "tab sits on the
          line" appearance familiar from docs sites. */}
      <ul className="-mb-px flex flex-wrap items-center gap-8">
        {siblings.map((post) => {
          const isActive = post.slug === currentSlug;
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block py-3 text-sm tracking-wide border-b-2 transition-colors ${
                  isActive
                    ? "border-gold-deep text-ink font-medium"
                    : "border-transparent text-ink-mute hover:text-ink-soft hover:border-gold/40"
                }`}
              >
                {post.groupLabel || post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
