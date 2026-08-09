/**
 * Small editorial aside components, extracted from patterns repeated across
 * posts so an MDX file stops hand-rolling the same <aside> markup.
 *
 * - <Republished>: the "First published on LinkedIn … Republished here." banner
 *   that tops each re-posted article. Only the URL and date vary.
 *     <Republished href="https://www.linkedin.com/..." date="27 June 2025" />
 *
 * - <PullQuote>: a boxed, big-serif key statement with an optional eyebrow.
 *     <PullQuote color="emerald" label="The role of the business manager">
 *     A good manager is the gatekeeper of whether change becomes value.
 *     </PullQuote>
 *
 * - <Callout>: a colour-tinted, accent-bordered highlight for a supporting note
 *   or key stat, meant to stand out from the body.
 *     <Callout color="emerald">
 *     In practical terms, that is around **9 to 9.6 weeks**.
 *     </Callout>
 *
 * Both <Callout> and <PullQuote> take an optional `color` (default "gold").
 * Blank lines around the children are required so MDX parses them as markdown.
 * Registered in `mdx-components.tsx` and the post page's components map.
 */

export type AccentColor = "gold" | "emerald" | "amber" | "red" | "blue";

/**
 * Full literal class strings per accent so Tailwind's JIT keeps them. `border`
 * is the accent rule, `bg` a clearly-tinted fill (not a barely-there cream),
 * and `eyebrow` the label colour.
 */
const ACCENT: Record<AccentColor, { border: string; bg: string; eyebrow: string }> = {
  gold: { border: "border-gold-deep", bg: "bg-gold/15", eyebrow: "text-gold-deep" },
  emerald: { border: "border-emerald-700", bg: "bg-emerald-100/70", eyebrow: "text-emerald-800" },
  amber: { border: "border-amber-700", bg: "bg-amber-100/70", eyebrow: "text-amber-800" },
  red: { border: "border-red-700", bg: "bg-red-100/70", eyebrow: "text-red-800" },
  blue: { border: "border-blue-700", bg: "bg-blue-100/70", eyebrow: "text-blue-800" },
};

export function Republished({ href, date }: { href: string; date: string }) {
  return (
    <aside className="not-prose mt-2 mb-10 p-4 rounded-lg border border-gold/30 bg-cream-50 text-sm text-ink-soft">
      First published on{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in a new tab)"
        className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep"
      >
        LinkedIn
      </a>{" "}
      on {date}. Republished here.
    </aside>
  );
}

export function PullQuote({
  color = "gold",
  label,
  children,
}: {
  color?: AccentColor;
  label?: string;
  children: React.ReactNode;
}) {
  const a = ACCENT[color];
  return (
    <aside
      className={`not-prose my-8 rounded-xl border ${a.border} ${a.bg} p-6 shadow-sm`}
    >
      {label ? (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${a.eyebrow}`}>
          {label}
        </p>
      ) : null}
      <div className="font-serif text-2xl font-semibold leading-snug text-ink md:text-3xl [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

export function Callout({
  color = "gold",
  children,
}: {
  color?: AccentColor;
  children: React.ReactNode;
}) {
  const a = ACCENT[color];
  return (
    <aside
      className={`not-prose my-6 rounded-lg border-l-4 ${a.border} ${a.bg} px-5 py-4 shadow-sm`}
    >
      <div className="font-serif text-lg leading-snug text-ink-soft [&>p]:m-0 [&_strong]:text-ink">
        {children}
      </div>
    </aside>
  );
}
