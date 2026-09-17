"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePresence } from "@/lib/use-presence";
import { useFocusTrap } from "@/lib/use-focus-trap";

export type RecommendDialogProps = {
  /** Whether the dialog is open. It fades and scales in and out. */
  open: boolean;
  /** Called on "Continue to this article", Escape or a backdrop click. */
  onClose: () => void;
  /** Called when the reader follows the recommendation, before navigation. */
  onFollow?: () => void;
  /** Link to the recommended post. */
  href: string;
  /** Title of the recommended post. */
  title: string;
  excerpt?: string;
  /** Card image, ideally a 1200x630 social card. Other shapes are fitted, not cropped. */
  image?: string;
  eyebrow?: string;
  heading?: string;
  reason?: string;
  cta?: string;
  dismissLabel?: string;
};

/**
 * A modal that points the reader to a newer or richer post, with the option
 * to stay. Controlled: the caller owns `open`, so it can be driven by
 * first-visit logic (see RecommendModal), a button or a story.
 */
export function RecommendDialog({
  open,
  onClose,
  onFollow,
  href,
  title,
  excerpt,
  image,
  eyebrow = "Recommended instead",
  heading = "There is a newer article on this",
  reason,
  cta = "Read the new article",
  dismissLabel = "Continue to this article",
}: RecommendDialogProps) {
  const { mounted, shown } = usePresence(open);
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);

  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm p-4 transition-opacity duration-200 ease-out ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommend-heading"
        aria-describedby={reason ? "recommend-reason" : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`not-prose w-full max-w-lg rounded-2xl bg-cream shadow-2xl ring-1 ring-gold/30 overflow-hidden font-sans transition duration-200 ease-out ${shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"}`}
      >
        {image ? (
          // Social cards are 1200x630, so the frame keeps that ratio. Any
          // other shape is fitted inside it rather than cropped.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="block w-full h-auto aspect-[1200/630] object-contain bg-cream-200 border-b border-gold/20"
          />
        ) : null}
        <div className="p-6 sm:p-7">
          <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold">{eyebrow}</p>
          <h2 id="recommend-heading" className="mt-2 font-serif text-2xl sm:text-3xl text-ink leading-tight">
            {heading}
          </h2>
          {reason ? (
            <p id="recommend-reason" className="mt-3 text-base text-ink-soft leading-relaxed">
              {reason}
            </p>
          ) : null}
          <div className="mt-5 rounded-xl border border-gold/30 bg-white/60 p-4">
            <p className="font-serif text-lg text-ink leading-snug">{title}</p>
            {excerpt ? <p className="mt-1 text-sm text-ink-mute line-clamp-2">{excerpt}</p> : null}
          </div>
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink border border-ink/15 hover:border-ink/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              {dismissLabel}
            </button>
            <Link
              ref={primaryRef}
              href={href}
              onClick={onFollow}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-cream bg-ink hover:bg-gold-deep text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              {cta} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
