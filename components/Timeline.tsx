/**
 * Vertical timeline used for "short history" sections in long-form posts.
 *
 * Visual: a gold rule down the left, each entry anchored by a gold-deep
 * circle that carries a short year ("'24", "'25"). The circle matches the
 * 36px badge geometry used by TickList / NumberedList so the list styles
 * read as a family. The connecting rule is drawn per-entry (flex-1 below
 * each circle) so it always meets the next circle regardless of how tall
 * the content is; it is hidden on the final entry.
 *
 * The date sits in the small-caps accent style used elsewhere on the site.
 * Content renders inside prose so links and emphasis inherit cleanly.
 *
 * The final entry can be marked `current` to render a larger, ring-haloed
 * circle ("you are here").
 *
 * Registered globally in `mdx-components.tsx` and in the post page's
 * component map, so any MDX file can use it directly:
 *
 *   <Timeline>
 *     <TimelineEntry date="January 2024">
 *       Public launch. Python v0.0.10 on 9 January, JS v0.0.1 on 18 January.
 *     </TimelineEntry>
 *     <TimelineEntry date="Today" current>
 *       v1.2.2 (Python) and v1.3.2 (JS) are the current releases.
 *     </TimelineEntry>
 *   </Timeline>
 *
 * Blank lines around <TimelineEntry> tags are required so MDX parses the
 * children as markdown rather than as a single inline expression.
 */

type TimelineProps = {
  children: React.ReactNode;
};

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="not-prose my-8">
      {/* The connecting rule lives on each entry (see TimelineEntry); the
          final entry's rule is hidden so the line stops at the last circle. */}
      <ol className="relative [&>li:last-child_.tl-rule]:hidden">
        {children}
      </ol>
    </div>
  );
}

/** Derive a short year label ("'25") from the entry's date string. Falls back
 *  to the current year for a `current` "Today"-style entry with no explicit
 *  year, and honours an explicit `year` override when supplied. */
function shortYear(date: string, current: boolean, year?: string): string {
  if (year) return year;
  const match = date.match(/\b20(\d{2})\b/);
  if (match) return `'${match[1]}`;
  if (current) return `'${String(new Date().getFullYear()).slice(-2)}`;
  return "";
}

/** The date label shown beside the circle, with the full year stripped out
 *  since the circle already carries it (e.g. "January 2024" -> "January",
 *  "22 October 2025" -> "22 October", "Today" -> "Today"). */
function labelWithoutYear(date: string): string {
  return date.replace(/\b20\d{2}\b/, "").replace(/\s{2,}/g, " ").trim();
}

type TimelineEntryProps = {
  /** Short label rendered above the body, e.g. "January 2024" or "Today". */
  date: string;
  /** Override the year shown in the circle (e.g. "'25"). Auto-derived from
   *  `date` when omitted. */
  year?: string;
  /** Render a larger, ring-haloed circle for "you are here" style emphasis. */
  current?: boolean;
  children: React.ReactNode;
};

export function TimelineEntry({ date, year, current = false, children }: TimelineEntryProps) {
  const label = shortYear(date, current, year);
  return (
    <li className="flex gap-5">
      {/* Left rail: fixed-width so the rule sits at the same x and runs
          through the centre of every circle (including the larger current
          one). The circle is centred in the rail; the rule fills the rest of
          the row with no gap, so it touches the bottom of this circle and the
          top of the next. */}
      <div className="flex w-11 flex-col items-center self-stretch">
        <span
          aria-hidden
          className={
            "inline-flex shrink-0 items-center justify-center rounded-full bg-gold-deep font-serif font-semibold text-cream " +
            (current
              ? "h-11 w-11 text-sm ring-4 ring-gold/25"
              : "h-9 w-9 text-xs ring-1 ring-gold-deep/30")
          }
        >
          {label}
        </span>
        <span aria-hidden className="tl-rule w-0.5 flex-1 bg-gold/40" />
      </div>

      {/* Content. pb gives the gap to the next entry; the connecting rule
          spans it. */}
      <div className="pb-9 pt-1.5">
        <p className="text-sm tracking-[0.22em] uppercase text-gold-deep font-semibold mb-2">
          {labelWithoutYear(date)}
        </p>
        <div className="prose prose-base max-w-prose font-serif text-ink-soft">
          {children}
        </div>
      </div>
    </li>
  );
}
