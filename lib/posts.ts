import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Category = "Business" | "Tech" | "Shorts";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  tags: string[];
  /** Canonical URL when a post is republished from an external source (e.g. LinkedIn). */
  canonical?: string;
  /** Path to the hero image, e.g. /posts/<slug>/hero.png. Rendered at the top
   *  of the post AND used as the OG / Twitter card image. */
  hero?: string;
  /** Alt text for the hero image. Falls back to the post title if not set. */
  heroAlt?: string;
  /** Path to a social-card image used ONLY for OG / Twitter metadata, never
   *  rendered in the page body. Use when the post already has a visual hero
   *  (e.g. a live component) but still needs a static image for link unfurls.
   *  Takes precedence over `hero` for metadata when both are set. */
  ogImage?: string;
  /** When true, sorts ahead of all non-pinned posts everywhere they're listed. */
  pinned?: boolean;
  /**
   * Optional series the post belongs to (e.g. "Automation Review").
   * Renders a small series badge next to the category on cards and post pages.
   */
  series?: string;
  /**
   * Optional group identifier for posts that share a tabbed UI. Posts with
   * the same `group` value render a tab nav above the title linking to each
   * other. Used for splitting a long post into "Article" + "Demo" or similar.
   */
  group?: string;
  /** Label shown in the tab when this post is part of a group. */
  groupLabel?: string;
  /** Sort order within the group. Lower numbers come first. */
  groupOrder?: number;
  /**
   * Publish state:
   * - undefined / false: standard, listed everywhere.
   * - `unlisted: true`: route still resolves at `/blog/<slug>` but the post is
   *   excluded from the blog index, home recents, sitemap, llms.txt, and
   *   llms-full.txt. The post page itself also emits `noindex, nofollow`.
   *   Useful for shared-by-link drafts, retired posts you want to keep
   *   accessible, or one-off pieces you don't want surfaced.
   * - `draft: true`: the file is completely ignored. The route 404s. The
   *   post is invisible to every consumer of this module. Useful for
   *   in-progress posts that aren't ready for any audience.
   */
  unlisted?: boolean;
  draft?: boolean;
  readingTime?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const rawTags = Array.isArray(data.tags) ? data.tags : [];
    const tags = rawTags
      .map((t) => String(t).trim())
      .filter((t) => t.length > 0);

    const canonical = typeof data.canonical === "string" ? data.canonical : undefined;
    const hero = typeof data.hero === "string" ? data.hero : undefined;
    const heroAlt = typeof data.heroAlt === "string" ? data.heroAlt : undefined;
    const ogImage = typeof data.ogImage === "string" ? data.ogImage : undefined;
    const pinned = data.pinned === true;
    const unlisted = data.unlisted === true;
    const draft = data.draft === true;
    const series = typeof data.series === "string" ? data.series : undefined;
    const group = typeof data.group === "string" ? data.group : undefined;
    const groupLabel = typeof data.groupLabel === "string" ? data.groupLabel : undefined;
    const groupOrder = typeof data.groupOrder === "number" ? data.groupOrder : undefined;

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      category: (data.category as Category) ?? "Tech",
      excerpt: String(data.excerpt ?? ""),
      tags,
      canonical,
      hero,
      heroAlt,
      ogImage,
      pinned,
      series,
      group,
      groupLabel,
      groupOrder,
      unlisted,
      draft,
      readingTime: estimateReadingTime(content),
    } satisfies PostMeta;
  });

  // Drafts are invisible to every consumer. Sort: pinned first, then date desc.
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return a.date < b.date ? 1 : -1;
    });
}

/**
 * Posts visible in listings: excludes both drafts and unlisted posts.
 * Use this for the home recents, blog index, sitemap, llms.txt, and any
 * other surface that enumerates posts. The `getAllPosts()` function above
 * still returns unlisted posts so their `/blog/<slug>` routes resolve.
 */
export function getListedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => !p.unlisted);
}

/**
 * Sibling posts within a `group` (for tabbed UI). Returns all non-draft posts
 * with the same `group` value, sorted by `groupOrder` ascending. Used by the
 * PostTabs component to render "Article / Demo" style navigation above the
 * title of any post in a group.
 */
export function getGroupSiblings(group: string | undefined): PostMeta[] {
  if (!group) return [];
  return getAllPosts()
    .filter((p) => p.group === group)
    .sort((a, b) => (a.groupOrder ?? 999) - (b.groupOrder ?? 999));
}

/**
 * Slugs of routable posts: includes unlisted posts (whose URLs still work)
 * and excludes drafts (whose URLs should 404).
 */
export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
