/**
 * Error / answer pair for troubleshooting accordions.
 *
 *   - The error text renders on the first line in red monospace bold with
 *     a small red ✗ icon, matching the visual vocabulary of CrossList.
 *   - The answer (children) renders below in a green-tinted block with a
 *     small green tick icon, matching TickList.
 *
 * Designed to stack inside an Accordion or anywhere else you have a list
 * of "if you see this, do that" pairs. Registered as `<ErrorBlock>` in
 * `mdx-components.tsx` and the post page's components map.
 *
 *   <ErrorBlock error="ERR_MODULE_NOT_FOUND: ...">
 *
 *   The file does not exist. Make sure you actually saved `src/main.ts`
 *   (Step 6) and that it lives in the `src` folder.
 *
 *   </ErrorBlock>
 *
 * The `error` prop is plain text (rendered in a single line of mono). The
 * answer is MDX children so you can use inline code, links, lists, etc.
 */

type Props = {
  /** Error string. Rendered in red monospace bold on the first line. */
  error: string;
  /** Answer / fix. MDX content — paragraphs, inline code, links, etc. */
  children: React.ReactNode;
};

export function ErrorBlock({ error, children }: Props) {
  return (
    <div className="my-8 first:mt-0 last:mb-0">
      {/* Red error line */}
      <div className="not-prose flex items-start gap-2.5">
        <span
          aria-hidden
          className="inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-red-700 text-cream mt-0.5"
        >
          <svg
            viewBox="0 0 24 24"
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </span>
        <p className="font-mono text-sm font-bold text-red-700 leading-snug break-words">
          {error}
        </p>
      </div>

      {/* Green answer block */}
      <div className="mt-3 flex items-start gap-2.5">
        <span
          aria-hidden
          className="inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-emerald-700 text-cream mt-1.5"
        >
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="5 12.5 10 17.5 19 7.5" />
          </svg>
        </span>
        {/* Wrap children in a green-tinted prose context. The arbitrary
            selectors keep paragraph margins tight inside the block and
            re-tint inline code to read against the green text. */}
        <div className="text-emerald-900 [&>p]:my-0 [&>p+p]:mt-2 [&_code]:text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}
