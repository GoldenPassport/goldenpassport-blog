"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useImageReady } from "@/lib/use-image-ready";
import { usePresence } from "@/lib/use-presence";

/**
 * Drop-in replacement for `<img>` in MDX content. Renders the image inline
 * as usual, wrapped in a button so it is reachable by keyboard. Activating
 * the button (click, Enter, or Space) opens a lightbox where the image is
 * shown at natural size on a dim backdrop.
 *
 * Accessibility:
 *  - Image lives inside a `<button>` so keyboard users can Tab to it.
 *  - The trigger button is labelled "Enlarge image: <alt>".
 *  - The lightbox is a real modal: focus moves to the close button on open
 *    and returns to the trigger on close. Escape and backdrop click also
 *    close. Body scroll is locked while open.
 *  - Decorative images (alt="") still get a generic "Enlarge image" label
 *    so the trigger is announced meaningfully.
 *
 * Wired up via `mdx-components.tsx` so every `<img>` (and every markdown
 * `![]()` image) in any MDX post gets this behaviour automatically.
 */

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

// Inline post images default to lazy, low-priority loading: the text renders
// first, the hero (high priority) is fetched ahead of them, and screenshots
// below the fold (or inside closed <details> steps) wait until they are near.
// Each fades in once decoded (`.img-fade` in globals.css); pass width and
// height (PostImage does) so its space is reserved and the text never jumps.
// Pass `children` to replace the inline <img> (the hero uses next/image);
// the lightbox still opens the original `src`.
export function MdxImage({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "low",
  onLoad,
  onError,
  children,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // A cached image can finish before hydration, so its load event is missed;
  // check completion when the element mounts as well.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);
  const { mounted, shown } = usePresence(open);
  const { ready: fullReady, attach: attachFull, markReady: fullLoaded } = useImageReady(mounted && typeof src === "string" ? src : undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Keep Tab focus inside the open lightbox.
  useFocusTrap(dialogRef, open);

  // Manage focus + scroll lock + Escape while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Move focus to the close button so the dialog has keyboard focus.
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      // Return focus to the trigger when the lightbox closes.
      trigger?.focus();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const triggerLabel = alt ? `Enlarge image: ${alt}` : "Enlarge image";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
        // Reset native button styling so the image fills the space exactly
        // as a bare `<img>` would. Keeps the layout in MDX unchanged.
        className="block w-full p-0 m-0 bg-transparent border-0 cursor-zoom-in"
      >
        {children ?? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={typeof src === "string" ? src : undefined}
            alt={alt ?? ""}
            className={`img-fade ${className ?? ""}`}
            data-loaded={loaded ? "" : undefined}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
            onLoad={(e) => {
              setLoaded(true);
              onLoad?.(e);
            }}
            onError={(e) => {
              setLoaded(true);
              onError?.(e);
            }}
            {...rest}
          />
        )}
      </button>

      {mounted ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged image"}
          onClick={close}
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out transition-opacity duration-200 ease-out ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {shown && !fullReady ? <LightboxSpinner /> : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={attachFull}
            src={typeof src === "string" ? src : undefined}
            alt={alt ?? ""}
            onLoad={fullLoaded}
            onError={fullLoaded}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-full max-h-full w-auto h-auto rounded-lg shadow-2xl cursor-default transition-[opacity,transform] duration-300 ease-out ${shown && fullReady ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close enlarged image"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-cream text-ink-soft hover:text-gold-deep inline-flex items-center justify-center shadow-md transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}

/** Shown in a lightbox while a large image is still loading. */
export function LightboxSpinner() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-cream/25 border-t-cream"
    />
  );
}
