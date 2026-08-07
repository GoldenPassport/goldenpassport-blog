/**
 * Reusable accent cards for structurally-important sections.
 *
 * Three presets, each with a different semantic tone:
 *   - TldrCard:    ink / cream-200. Use at the top of a post to summarise.
 *   - VerdictCard: sage green.      Use for "the take" / conclusion / "bottom line".
 *   - CtaCard:     blue.            Use for "next action" / "drop me a message" / suggestions.
 *
 * Registered as MDX components in both `mdx-components.tsx` and the post page's
 * components map, so any MDX file can use them directly:
 *
 *   <TldrCard>
 *     One short paragraph that answers the question of the post.
 *   </TldrCard>
 *
 *   <VerdictCard>
 *     The conclusion goes here.
 *   </VerdictCard>
 *
 *   <CtaCard label="Let's talk">
 *     Drop me a message if this resonates.
 *   </CtaCard>
 *
 * Labels default to "TL;DR" / "Verdict" / "Get in touch" but can be overridden.
 * Children are rendered as-is, so the surrounding prose styles (font-serif,
 * spacing, link colour) inherit cleanly from the article's <div className="prose">
 * wrapper.
 */

type CardProps = {
  label?: string;
  children: React.ReactNode;
};

export function TldrCard({ label = "TL;DR", children }: CardProps) {
  return (
    <div className="my-10 p-8 rounded-lg border-l-4 border-ink bg-cream-200/70 ring-1 ring-ink/10">
      <p className="text-sm tracking-[0.22em] uppercase text-ink font-semibold mb-4 not-prose">
        {label}
      </p>
      {children}
    </div>
  );
}

export function VerdictCard({ label = "Verdict", children }: CardProps) {
  // id="verdict" lets the PostToc stepper include this card as the final
  // step. The accent-paragraph label provides the visible "VERDICT" cue;
  // the id is the anchor target.
  return (
    <div id="verdict" className="my-10 p-8 rounded-lg border-l-4 border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700/10 scroll-mt-24">
      <p className="text-sm tracking-[0.22em] uppercase text-emerald-800 font-semibold mb-5 not-prose">
        {label}
      </p>
      {children}
    </div>
  );
}

export function CtaCard({ label = "Get in touch", children }: CardProps) {
  return (
    <div className="my-10 p-8 rounded-lg border-l-4 border-blue-700 bg-blue-50/60 ring-1 ring-blue-700/10">
      <p className="text-sm tracking-[0.22em] uppercase text-blue-800 font-semibold mb-4 not-prose">
        {label}
      </p>
      {children}
    </div>
  );
}
