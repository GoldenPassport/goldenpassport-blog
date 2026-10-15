"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { usePresence } from "@/lib/use-presence";

/**
 * A small button that opens a dialog with a short how-to: numbered steps,
 * notes and screenshots written as ordinary MDX inside the tag. Use it for a
 * side task that most readers can skip, so the main walkthrough stays short.
 *
 *   <Guide label="How to add DeepSeek" title="Add DeepSeek as a custom AI model">
 *
 *   1. In ODC Portal, open **Integrate > AI models**...
 *
 *   </Guide>
 *
 * The dialog is modal with a focus trap, Escape and backdrop close, and focus
 * returns to the button. It is portalled to <body> because the button can sit
 * inside an MDX paragraph or list item.
 */
export function Guide({ label, title, children }: { label: string; title?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const { mounted, shown } = usePresence(open);

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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="not-prose ml-1 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream px-2.5 py-0.5 align-middle font-sans text-xs font-semibold text-gold-deep transition-colors hover:border-gold-deep hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="11" x2="12" y2="16" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        {label}
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
                  <h2 id={headingId} className="font-serif text-2xl leading-tight text-ink">
                    {title ?? label}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="prose min-h-0 max-w-none flex-1 overflow-y-auto px-5 py-4 font-serif sm:px-6 [&_a]:text-gold-deep [&_a]:underline [&_img]:rounded-lg [&_img]:ring-1 [&_img]:ring-gold/10 [&_li::marker]:text-gold-deep">
                  {children}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
