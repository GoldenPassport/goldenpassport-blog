"use client";

import { useRef, useState } from "react";

/**
 * Drop-in replacement for `<pre>` in MDX content. Renders the original
 * pre/code block (so prose styles still apply) and overlays a small
 * "copy to clipboard" button in the top-right corner. On click the icon
 * switches to a check for 2 seconds, then reverts.
 *
 * Wired up via the MDX `components` prop, so every fenced code block in
 * every post gets the copy affordance automatically.
 */

type Props = React.HTMLAttributes<HTMLPreElement>;

export function CodeBlock({ children, className, ...rest }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in insecure contexts (e.g. http://) or when the
      // browser blocks it. Silent fail is fine here — the user can still
      // select and copy manually.
    }
  };

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        // tabIndex + role + aria-label make the pre keyboard-focusable so
        // sighted keyboard users (and assistive tech) can reach the code
        // region and scroll it horizontally. Satisfies axe's
        // "element should be focusable / have focusable content" rules.
        tabIndex={0}
        role="region"
        aria-label="Code block"
        // !pt-10 wins over the typography plugin's default pre padding so
        // the first line of code is never hidden behind the copy button.
        className={`${className ?? ""} !pt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2`}
        {...rest}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        title={copied ? "Copied" : "Copy"}
        className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-8 h-8 rounded-md bg-cream/80 border border-gold/25 text-ink-soft hover:text-gold-deep hover:border-gold-deep/50 backdrop-blur-sm transition-colors"
      >
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
