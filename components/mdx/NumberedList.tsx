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
    <li className="flex items-start gap-4 [counter-increment:nl]">
      {/* Circular badge. The number comes from the ol's CSS counter via the
          ::before, and inline-flex + items-center + justify-center + leading-none
          centre the digit inside the disc. items-start keeps the badge on the
          FIRST line of the text; -mt-1 lifts the 36px disc so its centre sits on
          that line's centre (line-height is 1.75rem, disc is 2.25rem, so half
          the 0.5rem difference). */}
      <span
        aria-hidden
        className="-mt-1 shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-deep font-serif text-base font-semibold leading-none text-cream ring-1 ring-gold-deep/30 before:content-[counter(nl)]"
      />
      <div className="prose prose-base max-w-prose font-serif text-ink-soft">
        {children}
      </div>
    </li>
  );
}
