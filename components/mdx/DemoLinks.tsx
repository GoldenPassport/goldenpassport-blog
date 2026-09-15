import Link from "next/link";

/**
 * Prominent row of demo buttons, used at the top of an article that ships
 * with follow-along builds. Each <DemoLink> is a large card-style button:
 * a small-caps tool name, a title, a one-line blurb and a status.
 *
 * Buttons with an `href` link to the demo page. Buttons without one render
 * as "coming soon" placeholders so the reader sees the full set up front.
 *
 *   <DemoLinks label="Follow-along demos">
 *     <DemoLink tool="n8n" title="The fastest build" href="/blog/..." blurb="..." />
 *     <DemoLink tool="Camunda" title="The boundary on the diagram" blurb="..." />
 *     <DemoLink tool="LangGraph" title="The engineer's version" blurb="..." />
 *   </DemoLinks>
 *
 * Registered in `mdx-components.tsx` and the post page's components map.
 */

type LinksProps = {
  /** Small-caps lead-in above the row. */
  label?: string;
  children: React.ReactNode;
};

export function DemoLinks({ label = "Follow-along demos", children }: LinksProps) {
  return (
    <section aria-label={label} className="not-prose my-10">
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold mb-4">
        {label}
      </p>
      {/* Mobile: one horizontally scrolling row with snap points, bleeding to
          the viewport edge so the third card peeks in. Tablet and up: a
          three-up grid. */}
      <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible [&>*]:snap-start [&>*]:shrink-0 [&>*]:w-[78%] sm:[&>*]:w-auto">
        {children}
      </div>
    </section>
  );
}

type LinkProps = {
  /** Tool name shown in small caps, e.g. "n8n". */
  tool: string;
  /** Short headline for the build. */
  title: string;
  /** One-line description. */
  blurb?: string;
  /** Demo page URL. Omit to render a "coming soon" placeholder. */
  href?: string;
  /** Status text; defaults to "Open demo" when linked, "Coming soon" otherwise. */
  status?: string;
};

export function DemoLink({ tool, title, blurb, href, status }: LinkProps) {
  const body = (
    <>
      <p className="text-xs tracking-[0.18em] uppercase font-semibold mb-1 font-sans">
        {tool}
      </p>
      <p className="font-serif text-xl leading-tight">{title}</p>
      {blurb ? <p className="mt-2 text-sm font-sans leading-snug opacity-90">{blurb}</p> : null}
      {href ? (
        <p className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-sm font-semibold">
          {status ?? "Open demo"}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </p>
      ) : (
        <p className="mt-auto pt-4">
          <span className="inline-flex rounded-full border border-ink/15 bg-ink/5 px-2.5 py-1 font-sans text-[0.625rem] font-semibold uppercase leading-none tracking-[0.12em] text-ink-mute">
            {status ?? "Coming soon"}
          </span>
        </p>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex flex-col rounded-lg bg-gold-deep text-cream-50 p-6 shadow-sm ring-1 ring-gold-deep/30 transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        {body}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className="flex flex-col rounded-lg border-2 border-dashed border-gold/40 bg-cream-50 text-ink-mute p-6"
    >
      {body}
    </div>
  );
}
