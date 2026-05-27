/**
 * Numbered list with circular gold-deep number badges, used in long-form posts
 * for "here are the N things" sections where a bullet feels too flat.
 *
 * Numbers auto-increment via the CSS counter, so reordering items in MDX does
 * not need any manual re-numbering. The badge sits flush left, the content
 * flows in the same column as the surrounding prose.
 *
 * Registered as `<NumberedList>` / `<NumberedItem>` in `mdx-components.tsx` and
 * the post page's components map. Blank lines around each `<NumberedItem>`
 * tag are required so MDX parses the children as markdown.
 *
 *   <NumberedList>
 *
 *   <NumberedItem>
 *
 *   **Determinism in production.** Stakeholders want to know what the agent
 *   will do, not just what it did last time.
 *
 *   </NumberedItem>
 *
 *   <NumberedItem>
 *
 *   **Long-running workflows.** Some steps require human approval.
 *
 *   </NumberedItem>
 *
 *   </NumberedList>
 */

type ListProps = {
  children: React.ReactNode;
};

export function NumberedList({ children }: ListProps) {
  return (
    <ol className="not-prose my-8 list-none p-0 space-y-5 [counter-reset:nl]">
      {children}
    </ol>
  );
}

type ItemProps = {
  children: React.ReactNode;
};

export function NumberedItem({ children }: ItemProps) {
  return (
    <li
      className={[
        "relative pl-14 min-h-[2.25rem] flex items-start [counter-increment:nl]",
        // Circular badge as a ::before pseudo-element. content: counter(nl)
        // pulls the auto-incremented number from the parent ol's counter, and
        // flex centring puts the digit in the middle of the disc.
        "before:content-[counter(nl)]",
        "before:absolute before:left-0 before:top-0",
        "before:w-9 before:h-9 before:rounded-full",
        "before:bg-gold-deep before:text-cream",
        "before:font-serif before:text-base before:font-semibold",
        "before:flex before:items-center before:justify-center",
        "before:ring-1 before:ring-gold-deep/30",
      ].join(" ")}
    >
      <div className="prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </li>
  );
}
