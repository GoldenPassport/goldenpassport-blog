/**
 * Negative-marker checklist with red cross icons. Paired with TickList for
 * "where the gaps are" / "downsides" sections, where the visual contrast
 * (green tick vs. red cross) carries part of the meaning at a glance.
 *
 * Registered as `<CrossList>` / `<CrossItem>` in `mdx-components.tsx` and the
 * post page's components map. Blank lines around each `<CrossItem>` tag are
 * required so MDX parses the children as markdown.
 *
 *   <CrossList>
 *
 *   <CrossItem>
 *
 *   **Security posture needs active management.** ...
 *
 *   </CrossItem>
 *
 *   </CrossList>
 */

type ListProps = {
  children: React.ReactNode;
};

export function CrossList({ children }: ListProps) {
  return (
    <ul className="not-prose my-8 list-none p-0 space-y-5">
      {children}
    </ul>
  );
}

type ItemProps = {
  children: React.ReactNode;
};

export function CrossItem({ children }: ItemProps) {
  return (
    <li className="relative pl-12 flex items-start">
      {/* Cross badge. Matches the geometry of TickItem so the two list styles
          read as a family; only the colour and glyph change. red-700 picks up
          a slightly muted, serif-friendly tone rather than a fire-engine red. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-700 ring-1 ring-red-700/30"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cream"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </span>
      <div className="prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </li>
  );
}
