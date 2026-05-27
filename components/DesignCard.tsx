/**
 * Three-card layout for "where the design comes from" sections of reviews.
 *
 * Each card surfaces the headline lineage (source, year, one-line takeaway)
 * and a short body, with an optional <DesignCardMore> that expands to reveal
 * the deeper explanation. Built on native <details> so the expand/collapse
 * works without client-side JavaScript and inherits browser accessibility.
 *
 * The grid is two-up on tablet and three-up on desktop; cards stack on mobile.
 *
 * Registered as `<DesignCardGrid>`, `<DesignCard>`, `<DesignCardMore>` in
 * `mdx-components.tsx` and the post page's components map. Blank lines around
 * each MDX-level tag are required so MDX parses the children as markdown.
 *
 *   <DesignCardGrid>
 *
 *   <DesignCard
 *     title="Pregel"
 *     source="Google, 2009"
 *     tagline="Vertex-centric Bulk Synchronous Parallel"
 *     link="https://..."
 *     linkLabel="Pregel paper"
 *   >
 *
 *   Always-visible summary paragraph.
 *
 *   <DesignCardMore>
 *
 *   The deeper explanation hidden behind "Read more".
 *
 *   </DesignCardMore>
 *
 *   </DesignCard>
 *
 *   </DesignCardGrid>
 */

type GridProps = {
  children: React.ReactNode;
};

export function DesignCardGrid({ children }: GridProps) {
  return (
    <div className="not-prose my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

type CardProps = {
  /** Headline displayed prominently, e.g. "Pregel". */
  title: string;
  /** Small-caps source line above the title, e.g. "Google, 2009". */
  source: string;
  /** Optional italic one-liner under the title. */
  tagline?: string;
  /** Optional source link rendered at the bottom of the card. */
  link?: string;
  /** Label for the source link. Defaults to "Source". */
  linkLabel?: string;
  children: React.ReactNode;
};

export function DesignCard({ title, source, tagline, link, linkLabel = "Source", children }: CardProps) {
  return (
    <article className="rounded-lg border border-gold/25 bg-cream-50 p-6 flex flex-col">
      <header className="mb-4">
        <p className="text-xs tracking-[0.18em] uppercase text-gold-deep font-semibold mb-1">
          {source}
        </p>
        <h3 className="font-serif text-2xl text-ink leading-tight">{title}</h3>
        {tagline ? (
          <p className="mt-2 text-sm text-ink-soft italic">{tagline}</p>
        ) : null}
      </header>
      <div className="prose prose-base max-w-prose font-serif text-ink-soft flex-1">
        {children}
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep self-start"
        >
          {linkLabel} →
        </a>
      ) : null}
    </article>
  );
}

type MoreProps = {
  /** Summary label rendered when the section is collapsed. */
  label?: string;
  children: React.ReactNode;
};

export function DesignCardMore({ label = "Read more", children }: MoreProps) {
  return (
    <details className="group mt-4 -mx-2">
      <summary className="cursor-pointer select-none list-none flex items-center gap-2 px-2 py-2 rounded-md text-sm font-semibold text-gold-deep hover:bg-cream-200/40 transition-colors">
        <span className="group-open:hidden">{label}</span>
        <span className="hidden group-open:inline">Show less</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-open:rotate-180"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="mt-3 px-2 prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </details>
  );
}
