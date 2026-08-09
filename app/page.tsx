import Link from "next/link";
import { getListedPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/site";

// Home title falls back to the default site title (no `%s · Golden Passport` template).
export const metadata = {
  title: { absolute: `Luke Audie · ${SITE_NAME}` },
  alternates: { canonical: SITE_URL },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  url: SITE_URL,
  email: AUTHOR.email,
  jobTitle: "Business automation consultant",
  sameAs: [AUTHOR.linkedin],
  worksFor: { "@type": "Organization", name: "Golden Passport" },
  knowsAbout: [
    "Business automation",
    "Agentic AI",
    "Robotic Process Automation",
    "Business Process Management",
    "Process architecture",
    "Enterprise integration",
  ],
};

export default function Home() {
  const posts = getListedPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
        <p className="text-xs tracking-[0.22em] uppercase text-gold-deep">Luke Audie · Golden Passport</p>
        <h1 className="mt-5 font-serif text-5xl md:text-6xl text-ink leading-[1.05] max-w-3xl">
          Business automation, <span className="text-gold-deep italic">built well.</span>
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-2xl">
          Fifteen plus years in business automation and process architecture, built at software
          companies like IDS Scheer, Software AG, Red Hat and UiPath. Writing here about the
          business and the tech of modern automation.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-gold-deep transition-colors"
          >
            Read the blog
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-gold/40 text-ink-soft hover:border-gold hover:text-gold-deep transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      <div className="gold-rule mx-auto max-w-5xl" />

      <section className="mx-auto max-w-5xl px-6 pt-12 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-ink">Recent writing</h2>
          <Link href="/blog" className="text-sm text-ink-soft hover:text-gold-deep">
            View all →
          </Link>
        </div>
        <div className="mt-4">
          {posts.length === 0 ? (
            <p className="mt-6 text-ink-mute">First posts coming soon.</p>
          ) : (
            <PostList posts={posts} limit={4} />
          )}
        </div>
      </section>
    </>
  );
}
