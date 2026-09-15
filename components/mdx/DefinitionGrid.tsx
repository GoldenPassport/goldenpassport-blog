/**
 * A grid of short named ideas, each a term with a sentence or two of
 * explanation. Use it for sets of principles, pillars or criteria that read
 * better scanned than as a long bold-led bullet list.
 *
 *   <DefinitionGrid>
 *
 *   <DefinitionItem term="Identity and authorisation first">
 *
 *   Nothing about a person is retrieved until their identity is known.
 *
 *   </DefinitionItem>
 *
 *   </DefinitionGrid>
 *
 * One column on phones, two from the small breakpoint. Rendered as a
 * description list for assistive technology.
 */
export function DefinitionGrid({ children }: { children: React.ReactNode }) {
  return <dl className="not-prose m-0 my-8 grid gap-4 sm:grid-cols-2">{children}</dl>;
}

export function DefinitionItem({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gold/20 bg-cream-50 p-4 ring-1 ring-gold/[0.06] sm:p-5">
      <dt className="font-serif text-lg font-semibold leading-snug text-ink">{term}</dt>
      <dd className="m-0 mt-1.5 font-serif text-base leading-relaxed text-ink-soft [&_p]:m-0 [&_strong]:text-ink">
        {children}
      </dd>
    </div>
  );
}
