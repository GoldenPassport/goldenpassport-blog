/**
 * Post end-matter accordions: Terms, Calculations, References.
 *
 * Each wraps <Accordion> and bakes in the content styling that these blocks
 * repeat across posts, so an MDX file only supplies the content:
 *
 *   <Terms>
 *
 *   **Function point.** A standardised unit of software size...
 *
 *   </Terms>
 *
 *   <Calculations>
 *
 *   1. **Original capacity:** 12 weeks × 40 hours = 480 person-hours.
 *
 *   </Calculations>
 *
 *   <References>
 *
 *   **Managers and their role**
 *
 *   - CIPD: Line Managers' Role... <RefLink href="..." />
 *
 *   </References>
 *
 * Blank lines around each tag are required so MDX parses the children as
 * markdown. Title / id / defaultOpen fall through to <Accordion> with sensible
 * defaults (References keeps id="references" so it stays deep-linkable).
 *
 * Registered in `mdx-components.tsx` and the post page's components map.
 */
import { Accordion } from "./Accordion";

type Props = {
  /** Accordion heading. Defaults to the block name. */
  title?: string;
  /** Anchor id for deep-linking. References defaults to "references". */
  id?: string;
  /** Open on initial render. Defaults to closed. */
  defaultOpen?: boolean;
  children: React.ReactNode;
};

/**
 * Glossary accordion. Each definition paragraph is separated by a thin gold
 * rule, with the last one's border removed.
 */
export function Terms({ title = "Terms", id, defaultOpen, children }: Props) {
  return (
    <Accordion title={title} id={id} defaultOpen={defaultOpen}>
      <div className="[&>p]:border-b [&>p]:border-gold/15 [&>p]:pb-3 [&>p:last-child]:border-0 [&>p:last-child]:pb-0">
        {children}
      </div>
    </Accordion>
  );
}

/**
 * Worked-calculation accordion. Comfortable spacing on the ordered-list steps.
 */
export function Calculations({ title = "Calculations", id, defaultOpen, children }: Props) {
  return (
    <Accordion title={title} id={id} defaultOpen={defaultOpen}>
      <div className="[&_li]:my-2">{children}</div>
    </Accordion>
  );
}

/**
 * Reference-list accordion. Grouped lists (one <ul> per heading) are separated
 * by thin gold rules, with the last group's border removed.
 */
export function References({ title = "References", id = "references", defaultOpen, children }: Props) {
  return (
    <Accordion title={title} id={id} defaultOpen={defaultOpen}>
      <div className="[&_li]:my-2 [&_ul]:mt-3 [&_ul]:pb-6 [&_ul]:mb-6 [&_ul]:border-b [&_ul]:border-gold/15 [&_ul:last-child]:border-b-0 [&_ul:last-child]:pb-0">
        {children}
      </div>
    </Accordion>
  );
}
