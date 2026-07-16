import Link from "next/link";
import { BrandResponsive } from "@/components/Brand";

// Plain text links; Contact is rendered separately as a CTA button below.
const nav = [
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-gold/20 bg-cream-50/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <BrandResponsive />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-gold-deep transition-colors"
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
