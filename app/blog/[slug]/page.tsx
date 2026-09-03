import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getGroupSiblings, getPostSlugs } from "@/lib/posts";
import { CategoryBadge, TagList } from "@/components/blog/PostCard";
import { MdxImage } from "@/components/mdx/MdxImage";
import { Figure } from "@/components/mdx/Figure";
import { Republished, PullQuote, Callout } from "@/components/mdx/Asides";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { MarkAsRead } from "@/components/blog/MarkAsRead";
import { PostTabs } from "@/components/blog/PostTabs";
import { TldrCard, VerdictCard, CtaCard } from "@/components/mdx/CalloutCard";
import { Accordion } from "@/components/mdx/Accordion";
import { Terms, Calculations, References } from "@/components/mdx/EndMatter";
import { Timeline, TimelineEntry } from "@/components/mdx/Timeline";
import { DownloadsChart } from "@/components/mdx/DownloadsChart";
import { NumberedList, NumberedItem } from "@/components/mdx/NumberedList";
import { Chips } from "@/components/mdx/Chips";
import { TickList, TickItem } from "@/components/mdx/TickList";
import { CrossList, CrossItem } from "@/components/mdx/CrossList";
import { DesignCardGrid, DesignCard, DesignCardMore } from "@/components/mdx/DesignCard";
import { BarChart } from "@/components/mdx/BarChart";
import { ReviewDashboard } from "@/components/mdx/ReviewDashboard";
import { TriageGraphDiagram } from "@/components/mdx/TriageGraphDiagram";
import { Terminal } from "@/components/mdx/Terminal";
import { ErrorBlock } from "@/components/mdx/ErrorBlock";
import { RefLink } from "@/components/mdx/RefLink";
import { LinkedInShare } from "@/components/blog/LinkedInShare";
import { PostToc } from "@/components/chrome/PostToc";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/site";

const mdxComponents = {
  img: MdxImage,
  MdxImage,
  Figure,
  Republished,
  PullQuote,
  Callout,
  pre: CodeBlock,
  TldrCard,
  VerdictCard,
  CtaCard,
  Accordion,
  Terms,
  Calculations,
  References,
  Timeline,
  TimelineEntry,
  DownloadsChart,
  NumberedList,
  NumberedItem,
  Chips,
  TickList,
  TickItem,
  CrossList,
  CrossItem,
  DesignCardGrid,
  DesignCard,
  DesignCardMore,
  BarChart,
  ReviewDashboard,
  TriageGraphDiagram,
  Terminal,
  ErrorBlock,
  RefLink,
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  // Canonical: republished posts point at their original (LinkedIn etc.);
  // native posts canonicalise to themselves.
  const canonical = post.canonical ?? url;
  // Social-card image: prefer an explicit ogImage (used when the post has a
  // live HTML hero and the static image is for link unfurls only), else fall
  // back to the displayed hero. Absolute URL so crawlers resolve it.
  const ogImagePath = post.ogImage ?? post.hero;
  const ogImageUrl = ogImagePath ? `${SITE_URL}${ogImagePath}` : undefined;
  // Width/height are declared so crawlers (LinkedIn especially) can render
  // the card without fetching the image first. Post OG images are authored
  // at the standard 1200x630.
  const images = ogImageUrl
    ? [{ url: ogImageUrl, alt: post.heroAlt ?? post.title, width: 1200, height: 630 }]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical },
    ...(post.unlisted ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      siteName: SITE_NAME,
      publishedTime: post.date || undefined,
      authors: [AUTHOR.name],
      tags: post.tags,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  // The MDX module's default export accepts a `components` prop at runtime;
  // typing it loosely keeps us out of MDX's internal type maze.
  let MDXContent: React.ComponentType<{ components?: Record<string, unknown> }>;
  try {
    const mod = await import(`../../../content/posts/${slug}.mdx`);
    MDXContent = mod.default;
  } catch (e) {
    console.error(`Failed to load MDX for slug "${slug}":`, e);
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${slug}`;
  // Same precedence as generateMetadata: ogImage wins over hero for the
  // structured-data image.
  const ldImagePath = post.ogImage ?? post.hero;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    inLanguage: "en-GB",
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      sameAs: [AUTHOR.linkedin],
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    ...(ldImagePath ? { image: [`${SITE_URL}${ldImagePath}`] } : {}),
    ...(post.canonical ? { isBasedOn: post.canonical } : {}),
  };

  return (
    <>
    {/* Article + TOC share one max-w-5xl container so the content aligns with
        the header and footer. On xl+ the TOC is an in-flow sticky sidebar in
        the second grid column; below xl it collapses to a floating button and
        the article fills the full container width. */}
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-12">
    <article className="min-w-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <MarkAsRead slug={slug} />
      <Link href="/blog" className="text-sm text-ink-mute hover:text-gold-deep">
        ← All writing
      </Link>

      {post.unlisted ? (
        <div
          role="note"
          className="ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/5 border border-ink/15 text-xs tracking-[0.18em] uppercase text-ink-soft"
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
          Unlisted
        </div>
      ) : null}

      {post.hero ? (
        <figure className="mt-8 -mx-6 sm:mx-0">
          {/* Hero is a scene-setting banner, not a captioned figure: the
              alt text stays for accessibility, but no visible figcaption. */}
          <MdxImage
            src={post.hero}
            alt={post.heroAlt ?? post.title}
            className="w-full h-auto sm:rounded-xl shadow-sm ring-1 ring-gold/10"
            // Above the fold and usually the LCP element: keep it eager and
            // high priority (MdxImage defaults inline post images to lazy).
            loading="eager"
            fetchPriority="high"
          />
        </figure>
      ) : null}

      {/* Poster hero: when a post supplies `poster` in frontmatter, the
          ReviewDashboard renders here at the top, above the title header,
          matching how image heroes lead other articles. */}
      {post.poster ? (
        <div className="mt-8">
          <ReviewDashboard {...(post.poster as React.ComponentProps<typeof ReviewDashboard>)} />
        </div>
      ) : null}

      <header className="mt-6">
        {/* Render tab nav if this post is part of a group (e.g. Article / Demo).
            Returns null when there are no siblings, so single-tab posts get
            their original layout unchanged. */}
        <PostTabs
          siblings={getGroupSiblings(post.group)}
          currentSlug={post.slug}
        />
        <div className="flex items-center flex-wrap gap-3">
          <CategoryBadge category={post.category} />
          {/* SeriesBadge intentionally not rendered: series posts carry the
              series name in their title, so a badge would just repeat it. */}
          <span className="text-xs text-ink-mute">
            {post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink leading-tight">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-4 text-lg text-ink-soft">{post.excerpt}</p>
        ) : null}
        <TagList tags={post.tags} linkable truncate />
      </header>

      <div className="gold-rule my-10" />

      {/* max-w-none overrides the typography plugin's default max-width: 65ch
          so the body fills the article wrapper (max-w-3xl) and aligns with
          the header above it. */}
      <div className="prose prose-lg max-w-none font-serif">
        <MDXContent components={mdxComponents} />
      </div>

      {/* Post footer: share + back link. The thin gold rule above mirrors
          the rule between the header and body, bracketing the article. */}
      <div className="gold-rule my-12" />
      <footer className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold">
            Found this useful?
          </p>
          <LinkedInShare url={postUrl} title={post.title} />
        </div>
        <Link
          href="/blog"
          className="text-sm text-ink-mute hover:text-gold-deep transition-colors"
        >
          ← All writing
        </Link>
      </footer>
    </article>
    <PostToc />
    </div>
    </>
  );
}
