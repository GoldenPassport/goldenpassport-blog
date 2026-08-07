import Link from "next/link";
import { getListedPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";
import { TopicsFilter } from "@/components/blog/TopicsFilter";

import { SITE_URL } from "@/lib/site";

const description =
  "Writing from Luke Audie on business automation, agentic AI, RPA, BPM, and process architecture. Notes for operators and technologists working in regulated and enterprise environments.";

export const metadata = {
  title: "Writing",
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title: "Writing", description, url: `${SITE_URL}/blog`, type: "website" },
  twitter: { title: "Writing", description },
};

type Search = { category?: string; tag?: string };

/**
 * Build a `/blog?…` URL that preserves the other active filter when toggling
 * one of them. If `value` matches what's already active, the toggle clears
 * that filter (click-to-deselect).
 */
function buildHref(opts: {
  activeCategory: string | null;
  activeTag: string | null;
  setCategory?: string | null;
  setTag?: string | null;
}): string {
  const category = opts.setCategory !== undefined ? opts.setCategory : opts.activeCategory;
  const tag = opts.setTag !== undefined ? opts.setTag : opts.activeTag;
  const params = new URLSearchParams();
  if (category) params.set("category", category.toLowerCase());
  if (tag) params.set("tag", tag);
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { category, tag } = await searchParams;
  const posts = getListedPosts();
  const active =
    category === "business"
      ? "Business"
      : category === "tech"
        ? "Tech"
        : category === "shorts"
          ? "Shorts"
          : null;
  // Tag comparison is case-insensitive so URLs are forgiving.
  const activeTag =
    typeof tag === "string"
      ? (posts.flatMap((p) => p.tags).find((t) => t.toLowerCase() === tag.toLowerCase()) ?? null)
      : null;

  let filtered = active ? posts.filter((p) => p.category === active) : posts;
  if (activeTag) filtered = filtered.filter((p) => p.tags.includes(activeTag));

  // All unique tags, sorted, but only those that exist on posts in the current
  // category. Keeps the tag row in sync with the category filter and avoids
  // showing tags that would yield zero results.
  const tagsInScope = Array.from(
    new Set((active ? posts.filter((p) => p.category === active) : posts).flatMap((p) => p.tags)),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-12">
      <h1 className="font-serif text-5xl text-ink">Writing</h1>
      <p className="mt-3 text-ink-soft max-w-prose">
        Notes on automation, operations, and the tools that make modern businesses run. Split into{" "}
        <span className="text-gold-deep">Business</span>,{" "}
        <span className="text-gold-deep">Tech</span>, and{" "}
        <span className="text-gold-deep">Shorts</span> (one-minute reads).
      </p>

      {/* Category filter row */}
      <nav aria-label="Filter by category" className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        <FilterLink
          href={buildHref({ activeCategory: active, activeTag, setCategory: null })}
          label="All"
          active={!active}
        />
        <FilterLink
          href={buildHref({ activeCategory: active, activeTag, setCategory: "Business" })}
          label="Business"
          active={active === "Business"}
        />
        <FilterLink
          href={buildHref({ activeCategory: active, activeTag, setCategory: "Tech" })}
          label="Tech"
          active={active === "Tech"}
        />
        <FilterLink
          href={buildHref({ activeCategory: active, activeTag, setCategory: "Shorts" })}
          label="Shorts"
          active={active === "Shorts"}
        />
      </nav>

      {/* Tag filter row — collapsible to one row by default, expandable on click. */}
      <TopicsFilter
        topics={tagsInScope.map((t) => {
          const isActive = activeTag === t;
          return {
            label: t,
            href: buildHref({
              activeCategory: active,
              activeTag,
              setTag: isActive ? null : t,
            }),
            active: isActive,
          };
        })}
        clearHref={
          activeTag ? buildHref({ activeCategory: active, activeTag, setTag: null }) : null
        }
      />

      <div className="gold-rule mt-8" />

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-mute">
          No posts match this filter
          {activeTag ? ` (tag: ${activeTag})` : ""}
          {active && activeTag ? " and category" : active ? " (category)" : ""}.{" "}
          <Link
            href={buildHref({ activeCategory: null, activeTag: null })}
            className="text-gold-deep underline underline-offset-4"
          >
            Show all
          </Link>
          .
        </p>
      ) : (
        <div className="mt-4">
          <PostList posts={filtered} />
        </div>
      )}
    </section>
  );
}

function FilterLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-ink text-cream border-ink"
          : "border-gold/30 text-ink-soft hover:border-gold hover:text-gold-deep"
      }`}
    >
      {label}
    </Link>
  );
}
