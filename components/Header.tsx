import Link from "next/link";
import { BrandResponsive } from "@/components/Brand";

const nav = [
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-gold/20 bg-cream-50/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <BrandResponsive />
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-gold-deep transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
