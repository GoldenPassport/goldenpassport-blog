/**
 * Collapsible disclosure section used for post-conclusion references / glossary.
 *
 * Built on native <details> / <summary> so it works without JavaScript and
 * inherits browser-default a11y (focusable, expand/collapse via keyboard).
 *
 * Visual: cream-50 card with a thin gold border, ink summary text, a chevron
 * on the right that rotates 180° when open. Matches the rest of the post's
 * accent-card visual language (Snapshot, TldrCard, VerdictCard, CtaCard).
 *
 * Registered as `<Accordion>` in `mdx-components.tsx` and the post page's
 * components map, so any MDX file can use it directly:
 *
 *   <Accordion title="Terms">
 *
 *   Markdown content here, blank lines required around the JSX boundaries.
 *
 *   </Accordion>
 */

type Props = {
  title: string;
  /** Open on initial render. Defaults to closed. */
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function Accordion({ title, defaultOpen = false, children }: Props) {
  return (
    <details
      open={defaultOpen}
      className="not-prose group my-4 rounded-lg border border-gold/25 bg-cream-50 overflow-hidden"
    >
      <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-4 px-6 py-4 font-serif text-lg text-ink hover:bg-cream-200/40 transition-colors">
        <span>{title}</span>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-ink-mute transition-transform duration-200 group-open:rotate-180"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="border-t border-gold/15 px-6 py-5">
        {/* Match the article body's typography exactly: prose-lg for size,
            max-w-none to fill the article width. Accordion content used to
            render at prose-base inside max-w-prose, which made code blocks
            wrap unexpectedly and text shrink when an accordion opened. */}
        <div className="prose prose-lg max-w-none font-serif">{children}</div>
      </div>
    </details>
  );
}
