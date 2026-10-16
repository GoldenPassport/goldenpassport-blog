"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text the reader pastes somewhere (a test message, a setting value), with a
 * copy button that copies the exact text. The button shows on hover or
 * keyboard focus, and always on touch screens.
 *
 *   | T05 | C1003 | <CopyRequest text="What is my balance?">My balance</CopyRequest> | ...
 *   name the model <CopyRequest text="deepseek-flash">`deepseek-flash`</CopyRequest>
 */
export function CopyRequest({ text, children }: { text: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable in insecure contexts; the title still
      // shows the exact message.
    }
  };

  return (
    <span className="group inline-flex items-start gap-1.5" title={text}>
      <span>{children}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy: ${text}`}
        title={copied ? "Copied" : `Copy: ${text}`}
        className="not-prose mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-gold/25 bg-cream/90 text-ink-mute transition hover:border-gold-deep/50 hover:text-gold-deep focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </span>
  );
}
