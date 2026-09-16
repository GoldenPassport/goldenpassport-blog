"use client";

import { useEffect, useRef, useState } from "react";
import { TestId } from "./TestId";

const CUSTOMER_TAG = /\s*(\[customer:[A-Z0-9]+\])\s*$/i;

type ConversationProps = {
  testId: string;
  message: string;
  /** The result to expect. Text in `backticks` renders as code. */
  expect?: string;
  children?: React.ReactNode;
};

function withCode(text: string) {
  return text.split(/`([^`]+)`/).map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-cream px-1 py-0.5 font-mono text-[0.85em] text-ink">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export function TestConversation({ testId, message, expect, children }: ConversationProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const tag = message.match(CUSTOMER_TAG)?.[1];
  const spoken = tag ? message.replace(CUSTOMER_TAG, "") : message;

  const handleCopy = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <li className="grid items-start gap-x-4 gap-y-2 sm:grid-cols-[3.25rem_minmax(0,1fr)]">
      <TestId className="w-fit justify-self-start px-2.5 py-1 text-[0.7rem] align-baseline sm:mt-3.5">{testId}</TestId>
      <div className="min-w-0">
        <div className="group relative rounded-lg border border-gold/25 bg-gold/[0.06] py-3 pl-4 pr-12 ring-1 ring-gold/[0.04]">
          <p className="m-0 font-serif text-lg leading-relaxed text-ink">
            &ldquo;{spoken}&rdquo;
            {tag ? (
              <code className="ml-2 inline-block whitespace-nowrap rounded border border-ink/10 bg-cream px-1.5 py-0.5 align-middle font-mono text-[0.75rem] leading-none text-ink-soft">
                {tag}
              </code>
            ) : null}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${testId} message`}
            title={copied ? "Copied" : "Copy test message"}
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gold/25 bg-cream/90 text-ink-mute opacity-100 shadow-sm transition hover:border-gold-deep/50 hover:text-gold-deep focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
          >
            {copied ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? `${testId} message copied` : ""}
          </span>
        </div>
        {copyFailed ? (
          <p role="status" className="mt-2 font-sans text-sm text-ink-soft">
            Clipboard access is unavailable. Select the message above and copy it manually.
          </p>
        ) : null}
        <div className="prose mt-2 max-w-none font-serif text-[1.0625rem] leading-relaxed text-ink-soft [&_p]:m-0 [&_strong]:text-ink">
          {expect ? (
            <p>
              <span className="mr-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                Expect
              </span>
              {withCode(expect)}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </li>
  );
}
