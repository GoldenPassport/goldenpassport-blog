/**
 * Poster-style hero dashboard for Automation Review posts. Replaces a hero
 * image with a structured executive summary that reads at a glance and at
 * depth: status banner, name, decorative graph illustration, meta chips,
 * stats strip, the problem the tool solves with icons, and pros / cons.
 *
 * Designed to function as a magazine cover for the review: a skim reader
 * should leave with the right take in five seconds; a depth reader sees
 * the same skeleton repeated underneath in prose.
 *
 * All content comes through structured props; no MDX children. Registered
 * as `<ReviewDashboard>` in `mdx-components.tsx` and the post page's
 * components map.
 *
 * The decorative graph illustration is a stylised StateGraph (nodes +
 * edges) and is part of the LangGraph identity. For non-graph-based
 * frameworks the prop `motif` can be set to a different SVG; defaults to
 * "graph".
 */

type Meta = {
  label: string;
  value: string;
};

type Problem = {
  /** Icon key: state | clock | branch | stream | group | shield | bolt */
  icon: ProblemIcon;
  title: string;
};

type ProblemIcon =
  | "state"
  | "clock"
  | "branch"
  | "stream"
  | "group"
  | "shield"
  | "bolt";

type ReachBar = {
  /** Row label, e.g. "LangGraph". */
  label: string;
  /** Numeric value, used to size the bar relative to the largest. */
  value: number;
  /** Rendered value text, e.g. "62M". */
  display: string;
  /** Highlight this bar (the review subject) in gold; others render muted. */
  highlight?: boolean;
};

type Reach = {
  /** Section label. Defaults to "Market reach". */
  label?: string;
  /** When set, the label becomes a link (e.g. to "#references"). */
  labelHref?: string;
  /** Big number fallback (e.g. "~62M") used when no bars are provided. */
  primary?: string;
  /** Caption under the big number. */
  primaryLabel?: string;
  /** When present, the reach block renders a mini horizontal bar chart
   *  instead of the single big number. */
  bars?: ReachBar[];
};

type Props = {
  name: string;
  /** Short kicker line above the name, e.g. "Automation Review · Vol 1". */
  kicker?: string;
  pitch: string;
  meta: Meta[];
  problems: Problem[];
  reach: Reach;
  pros: string[];
  cons: string[];
};

/** Horizontal bar chart comparing the review subject against peers.
 *  Label + value sit above each bar so longer names fit; the highlighted
 *  bar (the subject) is gold-deep, peers are muted. */
function ReachBarChart({ bars }: { bars: ReachBar[] }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div className="w-full lg:w-72">
      {bars.map((b, i) => (
        <div key={i} className="mb-3 last:mb-0">
          <div className="flex items-baseline justify-between mb-1">
            <span
              className={
                b.highlight
                  ? "text-sm font-semibold text-ink"
                  : "text-sm text-ink-soft"
              }
            >
              {b.label}
            </span>
            <span className="text-xs text-ink-mute tabular-nums">{b.display}</span>
          </div>
          <span className="block h-2.5 rounded-sm bg-ink/[0.06] relative overflow-hidden">
            <span
              className={`absolute inset-y-0 left-0 rounded-sm ${b.highlight ? "bg-gold-deep" : "bg-ink/30"}`}
              style={{ width: `${(b.value / max) * 100}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

export function ReviewDashboard({
  name,
  kicker = "Automation Review",
  pitch,
  meta,
  problems,
  reach,
  pros,
  cons,
}: Props) {
  return (
    <section
      aria-label={`${name} review summary`}
      className="not-prose my-10 rounded-xl overflow-hidden border border-gold/30 bg-cream-50 ring-1 ring-gold/15 shadow-sm"
    >
      {/* Status banner. Dark ink bar with the kicker only. */}
      <div className="bg-ink text-cream px-6 py-2.5 text-[0.6875rem] tracking-[0.22em] uppercase font-semibold">
        {kicker}
      </div>

      {/* Hero block. Two columns on lg+:
          - Col 1: kicker, headline, pitch, meta chips.
          - Col 2: reach label + comparison bar chart.
          Stacks to one column on mobile. */}
      <div className="p-5 sm:p-7 border-b border-gold/20 bg-gradient-to-br from-cream-50 to-cream-200/60">
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          {/* Col 1: identity */}
          <div className="min-w-0">
            <p className="text-[0.625rem] tracking-[0.28em] uppercase text-gold-deep font-semibold mb-2">
              Review Summary
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-ink leading-[1]">
              {name}
            </h2>
            <p className="mt-3 font-serif text-base sm:text-lg text-ink-soft max-w-2xl italic">
              {pitch}
            </p>
            {meta.length > 0 ? (
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                {meta.map((m, i) => (
                  <div key={i} className="flex items-baseline gap-1.5">
                    <dt className="text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute font-semibold">
                      {m.label}
                    </dt>
                    <dd className="text-sm text-ink font-semibold tabular-nums">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* Col 2: reach chart */}
          {reach.bars && reach.bars.length > 0 ? (
            <div className="lg:w-72 shrink-0">
              <p className="text-[0.625rem] tracking-[0.22em] uppercase text-gold-deep font-semibold mb-3">
                {reach.labelHref ? (
                  <a href={reach.labelHref} className="hover:underline underline-offset-2 decoration-gold/60">
                    {reach.label ?? "Market reach"}
                  </a>
                ) : (
                  (reach.label ?? "Market reach")
                )}
              </p>
              <ReachBarChart bars={reach.bars} />
            </div>
          ) : (
            <div className="lg:text-right shrink-0">
              <p className="text-[0.625rem] tracking-[0.22em] uppercase text-gold-deep font-semibold mb-1">
                {reach.label ?? "Market reach"}
              </p>
              <p className="font-serif text-3xl sm:text-4xl text-ink leading-none tabular-nums">
                {reach.primary}
              </p>
              <p className="mt-1 text-xs text-ink-mute">{reach.primaryLabel}</p>
            </div>
          )}
        </div>
      </div>

      {/* The problem it solves. Condensed horizontal row: a small caps label
          followed by inline icon + text pairs separated by hairline dividers.
          Wraps on narrow viewports without losing rhythm. */}
      <div className="px-6 sm:px-8 py-4 sm:py-5 border-b border-gold/20 flex flex-col lg:flex-row lg:items-center gap-x-6 gap-y-3">
        <p className="text-[0.6875rem] tracking-[0.22em] uppercase text-gold-deep font-semibold shrink-0">
          The problem it solves
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:border-l lg:border-gold/20 lg:pl-6">
          {problems.map((p, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-gold-deep/10 text-gold-deep">
                <ProblemIconSvg icon={p.icon} />
              </span>
              <span className="font-serif text-sm text-ink-soft whitespace-nowrap">
                {p.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pros / cons. Two side-by-side panels, slight green / red tint to
          carry the meaning without shouting. */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-gold/20 bg-emerald-50/40">
          <p className="text-[0.6875rem] tracking-[0.22em] uppercase text-emerald-800 font-semibold mb-4">
            What is good
          </p>
          <ul className="space-y-2.5">
            {pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-700 text-cream mt-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="5 12.5 10 17.5 19 7.5" />
                  </svg>
                </span>
                <span className="font-serif text-sm sm:text-base text-ink-soft">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 sm:p-8 bg-red-50/40">
          <p className="text-[0.6875rem] tracking-[0.22em] uppercase text-red-800 font-semibold mb-4">
            Where the gaps are
          </p>
          <ul className="space-y-2.5">
            {cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-700 text-cream mt-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="11"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </span>
                <span className="font-serif text-sm sm:text-base text-ink-soft">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Small inline SVG icon set used by ReviewDashboard's "problem it solves"
 * tiles. Kept inline so the component is self-contained and so the icons
 * inherit colour from the surrounding text.
 */
function ProblemIconSvg({ icon }: { icon: ProblemIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "state":
      return (
        <svg {...common} aria-hidden>
          <polygon points="12 3 21 8 12 13 3 8 12 3" />
          <polyline points="3 12 12 17 21 12" />
          <polyline points="3 16 12 21 21 16" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      );
    case "branch":
      return (
        <svg {...common} aria-hidden>
          <circle cx="6" cy="5" r="2" />
          <circle cx="18" cy="5" r="2" />
          <circle cx="12" cy="19" r="2" />
          <path d="M6 7v4a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7" />
          <line x1="12" y1="14" x2="12" y2="17" />
        </svg>
      );
    case "stream":
      return (
        <svg {...common} aria-hidden>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="16" y2="12" />
          <line x1="4" y1="17" x2="12" y2="17" />
        </svg>
      );
    case "group":
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
          <circle cx="17" cy="9" r="2.25" />
          <path d="M15 20c0-2 1.5-3.5 4-3.5s2 1 2 3.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} aria-hidden>
          <polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2" />
        </svg>
      );
  }
}
