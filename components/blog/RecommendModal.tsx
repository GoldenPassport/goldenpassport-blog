"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePresence } from "@/lib/use-presence";
import { useFocusTrap } from "@/lib/use-focus-trap";

/**
 * Recommends a newer or richer post to readers who land on an older one.
 *
 * Driven by `recommend` in a post's frontmatter and rendered by the post page.
 * Opens once on first visit; "Continue to this article", Escape or a backdrop
 * click closes it and remembers the choice in localStorage, so it never nags.
 * Storage can be unavailable (private windows, blocked site data), so every
 * access is guarded and the modal simply shows again next time.
 */
export function RecommendModal({
  fromSlug,
  href,
  title,
  excerpt,
  image,
  heading = "There is a newer article on this",
  reason,
  cta = "Read the new article",
}: {
  fromSlug: string;
  href: string;
  title: string;
  excerpt?: string;
  image?: string;
  heading?: string;
  reason?: string;
  cta?: string;
}) {
  const storageKey = `gp-recommend-dismissed:${fromSlug}`;
  const [open, setOpen] = useState(false);
  const { mounted, shown } = usePresence(open);
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useFocusTrap(dialogRef, open);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(storageKey) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    // A short delay lets the page paint first, so the modal reads as an
    // invitation rather than a wall.
    const t = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(t);
  }, [storageKey]);

  const remember = useCallback(() => {
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // Storage unavailable: the modal will show again on the next visit.
    }
  }, [storageKey]);

  const close = useCallback(() => {
    remember();
    setOpen(false);
  }, [remember]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus.current?.focus?.();
    };
  }, [open, close]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm p-4 transition-opacity duration-200 ease-out ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommend-heading"
        aria-describedby="recommend-reason"
        onClick={(e) => e.stopPropagation()}
        className={`not-prose w-full max-w-lg rounded-2xl bg-cream shadow-2xl ring-1 ring-gold/30 overflow-hidden font-sans transition duration-200 ease-out ${shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"}`}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          // Social cards are 1200x630: show the whole card at that ratio so
          // its title is never cropped, with a hairline under it.
          <img
            src={image}
            alt=""
            className="block w-full h-auto aspect-[1200/630] object-cover border-b border-gold/20"
          />
        ) : null}
        <div className="p-6 sm:p-7">
          <p className="text-xs tracking-[0.22em] uppercase text-gold-deep font-semibold">
            Recommended instead
          </p>
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
              onClick={close}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink border border-ink/15 hover:border-ink/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              Continue to this article
            </button>
            <Link
              ref={primaryRef}
              href={href}
              onClick={remember}
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
