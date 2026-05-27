/**
 * Checklist with gold tick icons instead of bullet markers. Used in long-form
 * posts for "what is good" / "what works" sections where a positive marker
 * reads more clearly than a generic bullet.
 *
 * The mirror component for downsides is implicit: keep using regular bullet
 * lists for "where the gaps are" so the visual contrast (tick vs. bullet)
 * carries part of the meaning.
 *
 * Registered as `<TickList>` / `<TickItem>` in `mdx-components.tsx` and the
 * post page's components map. Blank lines around each `<TickItem>` tag are
 * required so MDX parses the children as markdown.
 *
 *   <TickList>
 *
 *   <TickItem>
 *
 *   **The right primitive at the right level.** A typed StateGraph...
 *
 *   </TickItem>
 *
 *   </TickList>
 */

type ListProps = {
  children: React.ReactNode;
};

export function TickList({ children }: ListProps) {
  return (
    <ul className="not-prose my-8 list-none p-0 space-y-5">
      {children}
    </ul>
  );
}

type ItemProps = {
  children: React.ReactNode;
};

export function TickItem({ children }: ItemProps) {
  return (
    <li className="relative pl-12 flex items-start">
      {/* Tick badge. 36px gold-deep disc with a white tick stroke, matching
          the visual weight of the numbered-list badge so the two list styles
          read as a family. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-700 ring-1 ring-emerald-700/30"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cream"
        >
          <polyline points="5 12.5 10 17.5 19 7.5" />
        </svg>
      </span>
      <div className="prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </li>
  );
}
