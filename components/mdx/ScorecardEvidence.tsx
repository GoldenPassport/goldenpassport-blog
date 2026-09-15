"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";

/** The "Evidence" button and the dialog it opens. Escape, the close button or
 *  a backdrop click closes it, and focus returns to the button. */
export function EvidenceButton({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

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
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="14 3 14 9 20 9" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
        Evidence
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center" onClick={close}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl ring-1 ring-gold/30"
          >
            <div className="flex items-start justify-between gap-4 border-b border-gold/20 px-6 py-4">
              <div>
                <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">Evidence</p>
                <h3 id={headingId} className="m-0 mt-1 font-serif text-2xl leading-tight text-ink">
                  {title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close evidence"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-gold/10 hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-deep"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className="prose max-w-none overflow-y-auto px-6 py-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
