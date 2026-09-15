/**
 * Side-by-side account of how several tools handle the same job, one card
 * per tool: a small-caps tool name, a one-line position and the detail.
 *
 *   <ToolComparison label="One concierge, three builds">
 *
 *   <ToolCard tool="Camunda" title="The boundary drawn on the diagram">
 *
 *   The process is BPMN, so the fixed paths are literally fixed.
 *
 *   </ToolCard>
 *
 *   </ToolComparison>
 *
 * Cards stack on phones and tablets and sit three-up on wide screens when
 * `columns={3}` is passed; the default is a single column for long bodies.
 */
export function ToolComparison({
  label,
  columns = 1,
  children,
}: {
  /** Optional small-caps lead-in above the cards. */
  label?: string;
  /** 1 (default, best for long text) or 3 for short cards. */
  columns?: 1 | 3;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label} className="not-prose my-8">
      {label ? (
        <p className="m-0 mb-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">{label}</p>
      ) : null}
      <div className={`grid gap-4 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>{children}</div>
    </section>
  );
}

export function ToolCard({
  tool,
  title,
  children,
}: {
  /** Tool name, shown in small caps, e.g. "n8n". */
  tool: string;
  /** One-line position for this tool. */
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-gold/25 bg-cream-50 p-5 ring-1 ring-gold/10 sm:p-6">
      <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{tool}</p>
      <p className="m-0 mt-1 font-serif text-xl leading-tight text-ink">{title}</p>
      <div className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft [&_p]:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </article>
  );
}
