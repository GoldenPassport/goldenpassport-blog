import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostSlugs } from "@/lib/posts";
import { CategoryBadge, TagList } from "@/components/PostCard";
import { MdxImage } from "@/components/MdxImage";
import { CodeBlock } from "@/components/CodeBlock";
import { MarkAsRead } from "@/components/MarkAsRead";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/site";

const mdxComponents = { img: MdxImage, MdxImage, pre: CodeBlock };

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
  const images = post.hero ? [{ url: post.hero, alt: post.heroAlt ?? post.title }] : undefined;

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
      ...(post.hero ? { images: [post.hero] } : {}),
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
    ...(post.hero ? { image: [`${SITE_URL}${post.hero}`] } : {}),
    ...(post.canonical ? { isBasedOn: post.canonical } : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-20">
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
          <MdxImage
            src={post.hero}
            alt={post.heroAlt ?? post.title}
            className="w-full h-auto sm:rounded-xl shadow-sm ring-1 ring-gold/10"
          />
        </figure>
      ) : null}

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-ink-mute">
            {post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink leading-tight">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-4 text-lg text-ink-soft max-w-prose">{post.excerpt}</p>
        ) : null}
        <TagList tags={post.tags} linkable />
      </header>

      <div className="gold-rule my-10" />

      <div className="prose prose-lg max-w-prose font-serif">
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  );
}
