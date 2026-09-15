import { TestId } from "./TestId";

/**
 * One recorded piece of evidence, typically inside a scorecard evidence
 * dialog: which test conversations it covers, when it was recorded and on
 * what (a model, a version), then the detail in markdown.
 *
 *   <EvidenceRecord tests="T06 T08" date="15 September 2026" note="deepseek-flash">
 *
 *   The phone change paused at the pre-action approval until Approve was clicked.
 *
 *   </EvidenceRecord>
 *
 * `label` replaces the test badges when the record is not about specific
 * conversations, e.g. label="Evaluation runs 1 to 3".
 */
export function EvidenceRecord({
  tests,
  label,
  date,
  note,
  children,
}: {
  /** Space- or comma-separated test ids, shown as badges. */
  tests?: string;
  /** Text lead-in used instead of (or as well as) test badges. */
  label?: string;
  /** When it was recorded, shown as "Recorded <date>". */
  date?: string;
  /** Extra context, such as the model or version. */
  note?: string;
  children: React.ReactNode;
}) {
  const ids = tests ? tests.split(/[\s,]+/).filter(Boolean) : [];
  return (
    <div className="not-prose my-4 rounded-lg border border-gold/20 bg-cream-50 p-4 first:mt-0 last:mb-0">
      <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-sans text-xs text-ink-mute">
        {ids.map((id) => (
          <TestId key={id}>{id}</TestId>
        ))}
        {label ? <span className="font-semibold uppercase tracking-[0.12em] text-gold-deep">{label}</span> : null}
        {date ? <span>Recorded {date}</span> : null}
        {note ? (
          <span className="rounded border border-ink/10 bg-cream px-1.5 py-0.5 font-mono text-[0.7rem] leading-none text-ink-soft">
            {note}
          </span>
        ) : null}
      </p>
      <div className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink-soft [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}
