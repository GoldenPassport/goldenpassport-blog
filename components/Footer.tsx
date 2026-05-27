import Link from "next/link";
import { BrandXs } from "@/components/Brand";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/20">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-ink-mute">
        <BrandXs />
        <nav aria-label="Footer" className="flex items-center gap-5">
          <Link href="/blog" className="hover:text-gold-deep transition-colors">
            Writing
          </Link>
          <Link href="/about" className="hover:text-gold-deep transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-gold-deep transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-gold-deep transition-colors">
            Privacy
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} Luke Audie. All rights reserved.</p>
      </div>
    </footer>
  );
}
