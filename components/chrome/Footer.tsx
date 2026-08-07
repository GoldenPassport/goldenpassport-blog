import Link from "next/link";
import { BrandXs } from "@/components/chrome/Brand";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/20">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-ink-mute flex flex-col gap-3">
        {/* Row 1: logo and copyright */}
        <div className="flex items-center justify-between gap-4">
          <BrandXs />
          <p>© {new Date().getFullYear()} Luke Audie. All rights reserved.</p>
        </div>

        {/* Rows 2 and 3: links, right-aligned */}
        <nav aria-label="Footer" className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-gold-deep transition-colors">
              Privacy
            </Link>
            <Link href="/disclaimer" className="hover:text-gold-deep transition-colors">
              Disclaimer
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/blog" className="hover:text-gold-deep transition-colors">
              Writing
            </Link>
            <Link href="/about" className="hover:text-gold-deep transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink text-cream px-4 py-2 font-medium hover:bg-gold-deep transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
