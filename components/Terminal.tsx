"use client";

import { useRef, useState } from "react";

/**
 * Terminal-styled code box for shell commands. Dark ink background, cream
 * monospace text, one prompt-prefixed line per command, copy-to-clipboard
 * button in the corner. Distinct from the generic CodeBlock (which uses
 * the prose plugin's pre theming) so commands stand out from inline code
 * and longer code snippets.
 *
 * Registered as `<Terminal>` in `mdx-components.tsx` and the post page's
 * components map. Pass commands as an array of strings:
 *
 *   <Terminal
 *     commands={[
 *       "git clone https://github.com/GoldenPassport/automation-review-examples.git",
 *       "cd automation-review-examples/langgraph-triage-demo-answer",
 *       "pnpm install",
 *       "pnpm dev",
 *     ]}
 *   />
 *
 * The prompt defaults to `$` (POSIX-style). Override with `prompt=">"` for
 * Windows PowerShell, `">>>"` for a Python REPL, etc.
 *
 * Long commands scroll horizontally rather than wrapping mid-token.
 */

type Props = {
  commands: string[];
  /** Prompt prefix rendered before each command. Defaults to "$". */
  prompt?: string;
};

export function Terminal({ commands, prompt = "$" }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in insecure contexts; silent fall-back lets
      // the user select and copy manually from the rendered text.
    }
  };

  return (
    <div className="not-prose relative my-6 group">
      <pre
        ref={preRef}
        tabIndex={0}
        role="region"
        aria-label="Terminal commands"
        className="bg-ink text-cream-50 rounded-lg pl-5 pr-5 pt-12 pb-5 overflow-x-auto font-mono text-sm leading-relaxed ring-1 ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
      >
        {commands.map((line, i) => (
          <div key={i} className="whitespace-pre">
            <span
              className="text-gold/70 select-none mr-3 inline-block w-3"
              aria-hidden
            >
              {prompt}
            </span>
            <span className="text-cream-50">{line}</span>
          </div>
        ))}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Commands copied" : "Copy commands to clipboard"}
        title={copied ? "Copied" : "Copy"}
        className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-8 h-8 rounded-md bg-cream-50/10 border border-cream-50/20 text-cream-50 hover:bg-cream-50/20 hover:border-cream-50/40 backdrop-blur-sm transition-colors"
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
