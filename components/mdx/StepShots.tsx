"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { preloadImage, useImageReady } from "@/lib/use-image-ready";
import { usePresence } from "@/lib/use-presence";
import { LightboxSpinner } from "./MdxImage";

/**
 * Compact "view screenshot" chips for process steps. Each chip is a small
 * icon button; activating it opens a lightbox with that screenshot, with
 * previous / next controls when a step has several shots. Nothing is shown
 * inline, so a step's text stays short and the pictures are one tap away.
 *
 * Used by <ProcessStep shots={[...]}> and also registered as <StepShots> so
 * an MDX file can drop a chip row anywhere:
 *
 *   <StepShots shots={[
 *     { src: "/posts/<slug>/step1.png", alt: "...", caption: "Click Import from File" },
 *   ]} />
 *
 * Accessibility: chips are real buttons with descriptive labels; the lightbox
 * is a modal with a focus trap, Escape and backdrop close, and arrow keys for
 * previous / next.
 */

export type Shot = {
  src: string;
  alt: string;
  /** Short caption shown under the image and used as the chip label. */
  caption?: string;
};

/**
 * Inline variant: a single small icon button that sits at the end of a
 * sentence or bullet and opens one screenshot. Registered as <Shot>:
 *
 *   - Type your instance name. <Shot src="..." alt="..." caption="..." />
 */
export function Shot({ src, alt, caption }: Shot) {
  return <StepShots shots={[{ src, alt, caption }]} inline />;
}

export function StepShots({ shots, label = "Screenshots", inline = false }: { shots: Shot[]; label?: string; inline?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = openIndex !== null;
  // Keep showing the last screenshot while the lightbox fades out.
  const [shownIndex, setShownIndex] = useState(0);
  if (openIndex !== null && openIndex !== shownIndex) setShownIndex(openIndex);
  const { mounted, shown } = usePresence(open);

  useFocusTrap(dialogRef, open);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRefs.current[openIndex ?? 0];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
    // Only re-run when the lightbox opens or closes, not on every index change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const current = mounted ? (shots[shownIndex] ?? null) : null;
  const { ready: fullReady, attach: attachFull, markReady: fullLoaded } = useImageReady(current?.src);
  if (!shots.length) return null;

  return (
    <>
      {inline ? (
        <button
          ref={(el) => {
            triggerRefs.current[0] = el;
          }}
          type="button"
          onClick={() => setOpenIndex(0)}
          onPointerEnter={() => preloadImage(shots[0].src)}
          onFocus={() => preloadImage(shots[0].src)}
          aria-label={`View screenshot${shots[0].caption ? `: ${shots[0].caption}` : ""}`}
          title={shots[0].caption ?? "View screenshot"}
          className="not-prose ml-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-cream text-gold-deep align-middle relative -top-[0.1em] hover:bg-gold/10 hover:border-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="12" cy="12" r="3.5" />
            <path d="M8 5l1.5-2h5L16 5" />
          </svg>
        </button>
      ) : (
      <div className="not-prose mt-4 flex flex-wrap items-center gap-2" aria-label={label}>
        {shots.map((s, i) => (
          <button
            key={s.src}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setOpenIndex(i)}
            onPointerEnter={() => preloadImage(s.src)}
            onFocus={() => preloadImage(s.src)}
            aria-label={`View screenshot ${i + 1} of ${shots.length}${s.caption ? `: ${s.caption}` : ""}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-3 py-1.5 font-sans text-xs font-semibold text-gold-deep hover:bg-gold/10 hover:border-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="12" cy="12" r="3.5" />
              <path d="M8 5l1.5-2h5L16 5" />
            </svg>
            {shots.length > 1 ? <span className="tabular-nums">{i + 1}</span> : null}
            <span className="max-w-[16rem] truncate">{s.caption ?? "Screenshot"}</span>
          </button>
        ))}
      </div>
      )}

      {/* The lightbox is portalled to <body>: an inline <Shot> sits inside an
          MDX paragraph, and a dialog rendered in place would nest a <div>
          inside a <p>, which is invalid HTML. */}
      {current
        ? createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt || "Screenshot"}
          onClick={close}
          className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/85 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out transition-opacity duration-200 ease-out ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {shown && !fullReady ? <LightboxSpinner /> : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            ref={attachFull}
            src={current.src}
            alt={current.alt}
            onLoad={fullLoaded}
            onError={fullLoaded}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-full max-h-[80vh] w-auto h-auto rounded-lg shadow-2xl cursor-default ring-1 ring-cream/20 transition-[opacity,transform] duration-300 ease-out ${shown && fullReady ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
          />
          {current.caption ? (
            <p
              onClick={(e) => e.stopPropagation()}
              className="mt-4 max-w-2xl text-center font-sans text-sm text-cream cursor-default"
            >
              {shots.length > 1 ? `${shownIndex + 1} of ${shots.length}. ` : ""}
              {current.caption}
            </p>
          ) : null}

          {shots.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous screenshot"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream text-ink-soft hover:text-gold-deep inline-flex items-center justify-center shadow-md transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next screenshot"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream text-ink-soft hover:text-gold-deep inline-flex items-center justify-center shadow-md transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </>
          ) : null}

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close screenshot"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-cream text-ink-soft hover:text-gold-deep inline-flex items-center justify-center shadow-md transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>,
          document.body,
        )
        : null}
    </>
  );
}
