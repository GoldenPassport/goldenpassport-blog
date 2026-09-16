import { EvidenceButton } from "./ScorecardEvidence";

/**
 * A scorecard: one row per concern, with the technical answer and a verdict
 * panel showing pass or fail, a score out of 10, one strength, one improvement
 * opportunity
 * and an evidence button that opens the detail.
 *
 *   <Scorecard>
 *
 *   <ScorecardRow
 *     concern="Accountability" question="Who answers when the agent acts?"
 *     answer="Human decision (Slack) is a send-and-wait owned by the process."
 *     verdict="pass" score={7}
 *     plus="Both approvals paused the run."
 *     minus="Capture who approved on the pre-action step too."
 *     evidenceTitle="Accountability evidence">
 *
 *   **T06 and T08 recorded:** the full detail, in markdown.
 *
 *   </ScorecardRow>
 *
 *   </Scorecard>
 *
 * Desktop shows three columns with headers; phones stack each row as a card.
 *
 * In plan mode, `scoreColumn` adds a narrow column of scores from a finished
 * build (for example the n8n demo), filled by each row's `toolScore`:
 *
 *   <Scorecard plan scoreColumn={{ label: "n8n", href: "/blog/some-demo#scorecard" }}>
 *   <ScorecardRow concern="Drift." answer="..." toolScore={7} />
 */
export function Scorecard({
  plan = false,
  answerLabel,
  scoreColumn,
  children,
}: {
  /** Plan mode: concern and answer only, no verdict column. Use it where the
   *  scorecard is being set out before any build is scored. */
  plan?: boolean;
  /** Header for the answer column. */
  answerLabel?: string;
  /** Plan mode only: a score column for one finished build, linked to its page. */
  scoreColumn?: { label: string; href?: string };
  children: React.ReactNode;
}) {
  const scored = plan && scoreColumn;
  return (
    <div className="not-prose my-10 overflow-hidden rounded-xl border border-gold/30 bg-cream-50 ring-1 ring-gold/10 font-sans">
      <div
        aria-hidden={scored ? undefined : true}
        className={`hidden md:grid ${scored ? PLAN_SCORE_COLS : plan ? PLAN_COLS : VERDICT_COLS} gap-6 border-b border-gold/25 bg-gold/[0.07] px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-deep`}
      >
        <span>Business concern</span>
        <span>{answerLabel ?? (plan ? "Technical answer" : "Technical answer in this build")}</span>
        {plan ? null : <span>Position and evidence</span>}
        {scored ? (
          <span className="text-center normal-case tracking-[0.08em]">
            {scoreColumn.href ? (
              <a href={scoreColumn.href} className="underline decoration-gold-deep/40 underline-offset-4 hover:decoration-gold-deep">
                {scoreColumn.label}
              </a>
            ) : (
              scoreColumn.label
            )}
          </span>
        ) : null}
      </div>
      <ul className="m-0 list-none divide-y divide-gold/20 p-0">{children}</ul>
    </div>
  );
}

type Verdict = "pass" | "partial" | "fail";

const VERDICT_COLS = "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.25fr)]";
const PLAN_COLS = "md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]";
const PLAN_SCORE_COLS = "md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_5.5rem]";

const VERDICT = {
  pass: { label: "Pass", pill: "bg-emerald-700 text-cream", ring: "ring-emerald-700/25 bg-emerald-50/60" },
  partial: { label: "Partial", pill: "bg-amber-600 text-cream", ring: "ring-amber-600/25 bg-amber-50/60" },
  fail: { label: "Fail", pill: "bg-red-700 text-cream", ring: "ring-red-700/25 bg-red-50/60" },
} as const;

function scoreTone(score: number) {
  if (score >= 7) return "text-emerald-800";
  if (score >= 5) return "text-amber-700";
  return "text-red-700";
}

function Strength() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-cream" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="10" r="0.6" fill="currentColor" />
        <circle cx="15" cy="10" r="0.6" fill="currentColor" />
        <path d="M8 14.5c1 1.4 2.4 2.1 4 2.1s3-.7 4-2.1" />
      </svg>
    </span>
  );
}

function Opportunity() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-cream" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="10" r="0.6" fill="currentColor" />
        <circle cx="15" cy="10" r="0.6" fill="currentColor" />
        <line x1="8.5" y1="15.5" x2="15.5" y2="15.5" />
      </svg>
    </span>
  );
}

export function ScorecardRow({
  concern,
  question,
  answer,
  verdict,
  score,
  plus,
  minus,
  evidenceTitle,
  toolScore,
  toolLabel,
  children,
}: {
  concern: string;
  question?: string;
  answer: string;
  /** Omit verdict, score, plus and minus for a plan row (see Scorecard plan). */
  verdict?: Verdict;
  score?: number;
  plus?: string;
  minus?: string;
  evidenceTitle?: string;
  /** Plan rows only: this concern's score in the finished build named by the
   *  scorecard's `scoreColumn`. */
  toolScore?: number;
  /** Name of that build, used for the phone layout and screen readers. */
  toolLabel?: string;
  children?: React.ReactNode;
}) {
  const v = verdict ? VERDICT[verdict] : null;
  const hasToolScore = !v && toolScore !== undefined;
  return (
    <li className={`grid gap-4 px-5 py-6 ${v ? VERDICT_COLS : hasToolScore ? PLAN_SCORE_COLS : PLAN_COLS} md:gap-6 md:px-6`}>
      <div>
        <p className="m-0 font-serif text-lg font-semibold leading-snug text-ink">{concern}</p>
        {question ? <p className="m-0 mt-1 font-serif text-base italic leading-snug text-ink-mute">{question}</p> : null}
      </div>

      <div>
        <p className="m-0 mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-deep md:hidden">
          Technical answer
        </p>
        <p className="m-0 font-serif text-base leading-relaxed text-ink-soft">{answer}</p>
      </div>

      {hasToolScore ? (
        <p
          className="m-0 flex items-baseline gap-2 leading-none md:justify-center md:pt-0.5"
          aria-label={`${toolLabel ?? "Build"} score ${toolScore} out of 10`}
        >
          <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-gold-deep md:hidden">
            {toolLabel ?? "Score"}
          </span>
          <span className={`font-serif text-3xl font-semibold tabular-nums ${scoreTone(toolScore)}`}>{toolScore}</span>
          <span className="text-sm font-semibold text-ink-mute">/10</span>
        </p>
      ) : null}

      {v && verdict ? (
      <div className={`rounded-lg p-4 ring-1 ${v.ring}`}>
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${v.pill}`}>
            {verdict === "pass" ? (
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
            {v.label}
          </span>
          <p className="m-0 leading-none" aria-label={`Score ${score} out of 10`}>
            <span className={`font-serif text-3xl font-semibold tabular-nums ${scoreTone(score ?? 0)}`}>{score}</span>
            <span className="text-sm font-semibold text-ink-mute">/10</span>
          </p>
        </div>

        <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
          <li className="flex gap-2.5 text-sm leading-snug text-ink-soft">
            <Strength />
            <span>
              <span className="sr-only">Strength: </span>
              {plus}
            </span>
          </li>
          <li className="flex gap-2.5 text-sm leading-snug text-ink-soft">
            <Opportunity />
            <span>
              <span className="sr-only">Improvement opportunity: </span>
              {minus}
            </span>
          </li>
        </ul>

        {children ? <EvidenceButton title={evidenceTitle ?? `${concern}: evidence`}>{children}</EvidenceButton> : null}
      </div>
      ) : null}
    </li>
  );
}

/**
 * Overall verdict shown under a scorecard: a large score out of 10, a headline
 * and markdown body (typically the case for the product and a short list of
 * ideas).
 *
 *   <ScorecardSummary score={8} headline="A very strong product">
 *
 *   Why, in a paragraph or two, then a numbered list of ideas.
 *
 *   </ScorecardSummary>
 */
export function ScorecardSummary({
  score,
  headline,
  label = "Overall",
  note,
  children,
}: {
  score: number;
  headline: string;
  label?: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={`${label}: ${score} out of 10`}
      className="not-prose -mt-4 mb-10 overflow-hidden rounded-xl border border-gold/30 bg-cream-50 ring-1 ring-gold/10"
    >
      <div className="grid gap-6 p-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:p-8">
        <div className="flex flex-row items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
          <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-emerald-700 text-cream shadow-sm ring-4 ring-emerald-700/15">
            <span className="font-serif text-4xl font-semibold leading-none tabular-nums">{score}</span>
            <span className="mt-1 font-sans text-xs font-semibold tracking-[0.12em]">/ 10</span>
          </div>
          <div className="font-sans">
            <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">{label}</p>
            {note ? <p className="m-0 mt-1 text-xs leading-snug text-ink-mute">{note}</p> : null}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="m-0 font-serif text-2xl leading-tight text-ink sm:text-3xl">{headline}</h3>
          <div className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft [&_p]:my-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-ink [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:my-2 [&_ol>li]:pl-1 [&_li::marker]:font-sans [&_li::marker]:text-sm [&_li::marker]:font-semibold [&_li::marker]:text-gold-deep">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
