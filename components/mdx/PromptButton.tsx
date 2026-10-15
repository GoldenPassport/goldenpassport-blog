"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { usePresence } from "@/lib/use-presence";

/**
 * A "View prompt" button that opens a dialog with the full prompt in an
 * editable box, so a reader can read it, adjust it for their own build and
 * copy it. Edits stay in the dialog (and are kept while the page is open);
 * Reset restores the published text.
 *
 * Rendered by the server <Prompt> component, which reads the text from
 * content/prompts, so the page and the companion repository share one copy.
 * Accessibility: a real button with a descriptive label; the dialog is modal
 * with a focus trap, Escape and backdrop close, and focus returns to the
 * button. The dialog is portalled to <body> because the button can sit
 * inside an MDX paragraph.
 */
export function PromptButton({ title, file, text }: { title: string; file: string; text: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const { mounted, shown } = usePresence(open);
  const edited = value !== text;

  useFocusTrap(dialogRef, open);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, close]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable in insecure contexts; the text box still
      // lets the reader select and copy by hand.
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`View prompt: ${title}`}
        className="not-prose ml-1 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream px-2.5 py-0.5 align-middle font-sans text-xs font-semibold text-gold-deep transition-colors hover:border-gold-deep hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="13" y2="13" />
        </svg>
        {title}
      </button>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm transition-opacity duration-200 ease-out sm:items-center ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
              onClick={close}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                onClick={(e) => e.stopPropagation()}
                className={`flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-cream-50 shadow-2xl ring-1 ring-gold/20 transition-transform duration-200 ease-out ${shown ? "translate-y-0" : "translate-y-3"}`}
              >
                <div className="flex items-start justify-between gap-4 border-b border-gold/20 px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Mentor prompt</p>
                    <h2 id={headingId} className="mt-1 font-serif text-2xl leading-tight text-ink">{title}</h2>
                    <p className="mt-1 font-mono text-xs text-ink-mute">{file}</p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close prompt"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col px-5 py-4 sm:px-6">
                  <label htmlFor={`${headingId}-text`} className="mb-2 font-sans text-sm text-ink-soft">
                    Adjust it for your own build if you need to, then copy it into Mentor.
                  </label>
                  <textarea
                    id={`${headingId}-text`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    spellCheck={false}
                    className="min-h-[40vh] flex-1 resize-y rounded-lg bg-ink p-4 font-mono text-sm leading-relaxed text-cream-50 ring-1 ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gold/20 px-5 py-4 sm:px-6">
                  {edited ? <span className="mr-auto font-sans text-xs text-ink-mute">Edited. Changes stay in this page only.</span> : null}
                  <button
                    type="button"
                    onClick={() => setValue(text)}
                    disabled={!edited}
                    className="rounded-full border border-ink/15 px-4 py-2 font-sans text-sm font-semibold text-ink-soft transition-colors hover:border-gold-deep hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-full bg-ink px-5 py-2 font-sans text-sm font-semibold text-cream transition-colors hover:bg-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                  >
                    {copied ? "Copied" : "Copy prompt"}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
