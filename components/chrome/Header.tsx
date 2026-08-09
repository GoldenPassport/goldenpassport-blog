import Link from "next/link";
import { BrandResponsive } from "@/components/chrome/Brand";
import { SiteSearch } from "@/components/chrome/SiteSearch";
import { getListedPosts } from "@/lib/posts";

// Plain text links; Contact is rendered separately as a CTA button below.
// `hideOnMobile` drops a link from the crowded small-screen header (it still
// lives in the footer); it reappears from `sm:` up.
const nav = [
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About", hideOnMobile: true },
];

export function Header() {
  // Build a lightweight client-side search index from the listed posts. Server
  // component, so this reads the filesystem at build time and ships only the
  // fields the search needs.
  const searchIndex = getListedPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <header className="border-b border-gold/20 bg-cream-50/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <BrandResponsive subLabel="Blog" />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7 text-sm">
          <SiteSearch posts={searchIndex} />
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-ink-soft hover:text-gold-deep transition-colors${
                item.hideOnMobile ? " hidden sm:inline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Contact is the primary call to action: a filled ink pill matching
              the site's primary buttons (e.g. the homepage "Read the blog"). */}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-ink text-cream px-4 py-2 font-medium hover:bg-gold-deep transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
