/**
 * Inline row of small pill badges, used to tag a paragraph with the concepts
 * it connects to, e.g. tying an action-plan step back to the decision rights it
 * clarifies. Sits directly under the paragraph it annotates.
 *
 * Registered in `mdx-components.tsx` and the post page's components map:
 *
 *   **Map the end-to-end processes.** ...prose...
 *
 *   <Chips label="Clarifies" items={["Outcome", "Boundaries", "Ownership"]} />
 */
type Props = {
  /** Optional lead-in label, e.g. "Clarifies". Rendered small and muted. */
  label?: string;
  /** Badge texts, left to right. */
  items: string[];
};

export function Chips({ label, items }: Props) {
  return (
    <div className="not-prose mt-3 flex flex-wrap items-center gap-2">
      {label && (
        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-ink-mute">
          {label}
        </span>
      )}
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 font-sans text-xs font-medium text-gold-deep"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
};

/** A compact inline identifier for test cases and other short references. */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="mr-1 inline-flex items-center rounded-full border border-gold/35 bg-gold/[0.08] px-2.5 py-1 align-middle font-sans text-[0.675rem] font-semibold uppercase leading-none tracking-[0.08em] text-gold-deep">
      {children}
    </span>
  );
}
