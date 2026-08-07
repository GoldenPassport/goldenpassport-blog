/**
 * Compact "link" affordance for reference lists, where the descriptive text
 * is plain and the source sits behind a small trailing link. Renders the word
 * "link" underlined, followed by an external-link icon, opening in a new tab.
 *
 * Registered as `<RefLink>` in the post page's MDX component map:
 *
 *   - McKinsey: Stop Wasting Your Most Precious Resource. <RefLink href="https://..." />
 */

type Props = {
  href: string;
  /** Override the visible link text. Defaults to "link". */
  label?: string;
};

export function RefLink({ href, label = "link" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose inline-flex items-center gap-1 align-baseline font-sans text-sm font-medium text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep transition-colors"
    >
      {label}
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}
