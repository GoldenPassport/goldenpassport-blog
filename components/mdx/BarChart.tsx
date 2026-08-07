/**
 * Horizontal bar chart for comparing a small set of values across labels.
 * Used in long-form posts to lift a numeric column out of a wide comparison
 * table so the magnitudes are legible at a glance.
 *
 * Rendered as pure HTML/CSS (no SVG, no charting library); bar widths come
 * from percentage of the largest value. Optional `highlight` flag picks out
 * the subject framework in the site's gold accent so readers can locate it
 * without re-reading the labels.
 *
 * Registered as `<BarChart>` in `mdx-components.tsx` and the post page's
 * components map. Example usage:
 *
 *   <BarChart
 *     title="Monthly downloads, agentic frameworks"
 *     bars={[
 *       { label: "LangGraph",     value: 62,   suffix: "M", highlight: true },
 *       { label: "Vercel AI SDK", value: 55.4, suffix: "M", note: "different scope" },
 *       { label: "Pydantic AI",   value: 41,   suffix: "M" },
 *     ]}
 *     footnote="Combined Python + JS where applicable."
 *   />
 */

type Bar = {
  /** Row label rendered on the left, e.g. "LangGraph". */
  label: string;
  /** Numeric value used both to size the bar and to render the trailing total. */
  value: number;
  /** Unit suffix appended to the rendered value, e.g. "M". */
  suffix?: string;
  /** Highlight this row in the gold accent colour. Use for the subject of
   *  the review so readers can locate it without re-reading the labels. */
  highlight?: boolean;
  /** Optional small italic annotation appended after the value, e.g.
   *  "different scope" for Vercel AI SDK. */
  note?: string;
};

type Props = {
  /** Caption rendered above the chart. */
  title: string;
  /** Ordered list of bars. Order is preserved; no auto-sort. */
  bars: Bar[];
  /** Optional small text rendered below the chart. */
  footnote?: string;
};

export function BarChart({ title, bars, footnote }: Props) {
  const max = Math.max(...bars.map((b) => b.value));

  return (
    <figure className="not-prose my-10 p-6 sm:p-8 rounded-lg border border-gold/25 bg-cream-50">
      <figcaption className="text-sm tracking-[0.22em] uppercase text-gold-deep font-semibold mb-6">
        {title}
      </figcaption>

      <ul className="space-y-3 font-serif text-ink-soft">
        {bars.map((b, i) => {
          const widthPercent = (b.value / max) * 100;
          // Inline colour keeps the component self-contained: the
          // highlight row uses the site gold-deep, the rest uses an
          // ink/muted tone so the highlight reads clearly without
          // needing a legend.
          const fill = b.highlight ? "#b08538" : "#1f1d1a";
          const labelColour = b.highlight ? "text-ink" : "text-ink-soft";
          return (
            <li key={i} className="grid grid-cols-[10rem_1fr_auto] sm:grid-cols-[12rem_1fr_auto] items-center gap-3">
              <span className={`text-sm sm:text-base font-semibold ${labelColour}`}>
                {b.label}
              </span>
              <span
                aria-hidden
                className="h-3 rounded-sm bg-ink/5 relative overflow-hidden"
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-sm"
                  style={{ width: `${widthPercent}%`, backgroundColor: fill, opacity: b.highlight ? 1 : 0.55 }}
                />
              </span>
              <span className="text-sm tabular-nums text-ink whitespace-nowrap">
                {b.value}
                {b.suffix ?? ""}
                {b.note ? (
                  <span className="ml-2 text-xs italic text-ink-mute font-serif">
                    {b.note}
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      {footnote ? (
        <p className="mt-6 text-sm text-ink-mute italic">{footnote}</p>
      ) : null}
    </figure>
  );
}
