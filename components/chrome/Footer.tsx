import Link from "next/link";
import { Brand } from "@/components/chrome/Brand";

const explore = [
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/lukeaudie";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute">
        {title}
      </h2>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-ink-soft hover:text-gold-deep transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-gold/20 bg-cream-50/60">
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* Top: brand block on the left, link columns on the right. Stacks on
            mobile (brand first, then the two link columns side by side). */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="group inline-flex">
              <Brand size="sm" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-mute">
              Writing on business automation, agentic AI, and process
              architecture. Notes for operators and technologists.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-deep hover:text-gold transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <FooterColumn title="Explore" links={explore} />
            <FooterColumn title="Legal" links={legal} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-gold/15 pt-6 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Luke Audie. All rights reserved.</p>
          <p className="font-serif tracking-wide text-ink-soft">
            Golden <span className="text-gold-deep">Passport</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
