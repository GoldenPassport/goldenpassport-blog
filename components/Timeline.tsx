/**
 * Vertical timeline used for "short history" sections in long-form posts.
 *
 * Visual: a single gold rule down the left, each entry pinned to it by a small
 * gold dot. The date sits in the small-caps accent style used elsewhere on the
 * site (Snapshot label, card chips). Content is rendered inside the surrounding
 * prose so links and emphasis inherit cleanly.
 *
 * The final entry can be marked `current` to render a slightly larger,
 * ring-haloed dot ("you are here").
 *
 * Registered globally in `mdx-components.tsx` and in the post page's component
 * map, so any MDX file can use it directly:
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
    <div className="not-prose my-8 ml-3">
      {/* The ol carries the solid rule between the first and last dots.
          Two pseudo-elements extend it as dashed segments above the first
          dot and below the last dot, signalling "history continues before
          this" and "story continues after this" without literal end-caps. */}
      <ol
        className={[
          "relative space-y-8 border-l-2 border-gold/40",
          "before:content-[''] before:absolute before:-left-0.5 before:-top-6 before:h-6 before:w-0 before:border-l-2 before:border-dashed before:border-gold/40",
          "after:content-[''] after:absolute after:-left-0.5 after:-bottom-6 after:h-6 after:w-0 after:border-l-2 after:border-dashed after:border-gold/40",
        ].join(" ")}
      >
        {children}
      </ol>
    </div>
  );
}

type TimelineEntryProps = {
  /** Short label rendered above the body, e.g. "January 2024" or "Today". */
  date: string;
  /** Render a larger, ring-haloed dot for "you are here" style emphasis. */
  current?: boolean;
  children: React.ReactNode;
};

export function TimelineEntry({ date, current = false, children }: TimelineEntryProps) {
  return (
    <li className="relative pl-8">
      {/* Dot. left-0 sits at the inside edge of the ol's 2px border, so a
          standard -translate-x-1/2 would leave the dot 1px to the right of
          the rule's centre. The extra 1px shift puts it dead centre. */}
      <span
        aria-hidden
        className={
          current
            ? "absolute left-0 top-1.5 -translate-x-[calc(50%+1px)] inline-block h-3.5 w-3.5 rounded-full bg-gold-deep ring-4 ring-gold/25"
            : "absolute left-0 top-2 -translate-x-[calc(50%+1px)] inline-block h-2.5 w-2.5 rounded-full bg-gold-deep"
        }
      />
      <p className="text-sm tracking-[0.22em] uppercase text-gold-deep font-semibold mb-2">
        {date}
      </p>
      <div className="prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </li>
  );
}
