/**
 * Donut chart for showing a small set of slices alongside a centre label
 * (typically a total). Used in posts that need a visual split between two or
 * three values without pulling in a charting library.
 *
 * Renders as inline SVG so it works in MDX without any client-side runtime.
 *
 * Registered as `<DownloadsChart>` in `mdx-components.tsx` and the post page's
 * components map. Example usage in MDX:
 *
 *   <DownloadsChart
 *     title="LangGraph downloads, last 30 days"
 *     total="~62M"
 *     totalLabel="combined"
 *     slices={[
 *       { label: "Python (PyPI)", value: 52.3, suffix: "M", colour: "gold" },
 *       { label: "JavaScript (npm)", value: 9.7, suffix: "M", colour: "ink" },
 *     ]}
 *     footnote="Python ~326M all-time; JS ~2.3M weekly."
 *   />
 */

type SliceColour = "gold" | "ink" | "emerald" | "blue";

type Slice = {
  /** Legend label, e.g. "Python (PyPI)". */
  label: string;
  /** Numeric value used to size the slice. Units do not matter; only the
   *  proportion across slices does. */
  value: number;
  /** Optional unit suffix appended to the value in the legend, e.g. "M". */
  suffix?: string;
  /** Named colour from the site's accent palette. Defaults to "gold". */
  colour?: SliceColour;
};

type Props = {
  /** Caption rendered above the chart. */
  title: string;
  /** Centre label, top line. Pass the total as a short string, e.g. "~62M". */
  total: string;
  /** Centre label, bottom line. Short descriptor, e.g. "combined". */
  totalLabel?: string;
  /** Two to four slices. Order matches stroke order, clockwise from 12. */
  slices: Slice[];
  /** Optional small text rendered below the legend. */
  footnote?: string;
};

const COLOURS: Record<SliceColour, string> = {
  // Site palette. Kept inline so the component is self-contained and so the
  // SVG stroke values can be passed without Tailwind's class-based colours.
  gold: "#b08538",
  ink: "#1f1d1a",
  emerald: "#047857",
  blue: "#1d4ed8",
};

export function DownloadsChart({ title, total, totalLabel, slices, footnote }: Props) {
  // Donut geometry. The viewBox is 100x100; the ring lives at radius 40 with
  // an 18-unit stroke, leaving a clear centre for the total label.
  const RADIUS = 40;
  const STROKE = 18;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const sum = slices.reduce((acc, s) => acc + s.value, 0);

  // Walk the slices and accumulate dash offsets so each arc starts where the
  // previous one ended. We rotate the whole group -90deg so the first slice
  // begins at 12 o'clock.
  let cumulative = 0;
  const arcs = slices.map((s) => {
    const fraction = s.value / sum;
    const length = fraction * CIRCUMFERENCE;
    const arc = {
      label: s.label,
      colour: COLOURS[s.colour ?? "gold"],
      dasharray: `${length} ${CIRCUMFERENCE - length}`,
      dashoffset: -cumulative,
      percent: Math.round(fraction * 1000) / 10,
    };
    cumulative += length;
    return arc;
  });

  return (
    <figure className="not-prose my-10 p-6 sm:p-8 rounded-lg border border-gold/25 bg-cream-50">
      <figcaption className="text-sm tracking-[0.22em] uppercase text-gold-deep font-semibold mb-6">
        {title}
      </figcaption>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-6">
        {/* Chart */}
        <div className="relative shrink-0 mx-auto sm:mx-0 w-44 h-44">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden>
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth={STROKE}
            />
            {arcs.map((a, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={a.colour}
                strokeWidth={STROKE}
                strokeDasharray={a.dasharray}
                strokeDashoffset={a.dashoffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          {/* Centre label, absolutely positioned so it doesn't fight the SVG
              rotation. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-3xl text-ink leading-none">{total}</span>
            {totalLabel ? (
              <span className="mt-1 text-xs tracking-[0.18em] uppercase text-ink-mute">
                {totalLabel}
              </span>
            ) : null}
          </div>
        </div>

        {/* Legend */}
        <ul className="flex-1 space-y-3 font-serif text-base text-ink-soft">
          {arcs.map((a, i) => {
            const s = slices[i];
            return (
              <li key={i} className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="shrink-0 inline-block h-3 w-3 rounded-sm translate-y-0.5"
                  style={{ backgroundColor: a.colour }}
                />
                <span className="flex-1">
                  <span className="text-ink font-semibold">{s.label}</span>
                  <span className="text-ink-mute">
                    {": "}
                    {s.value}
                    {s.suffix ?? ""} ({a.percent}%)
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {footnote ? (
        <p className="mt-6 text-sm text-ink-mute italic">{footnote}</p>
      ) : null}
    </figure>
  );
}
