"use client";

import { useCallback, useEffect, useState } from "react";
import { RecommendDialog, type RecommendDialogProps } from "@/components/blog/RecommendDialog";

/**
 * Recommends a newer or richer post to readers who land on an older one.
 *
 * Driven by `recommend` in a post's frontmatter and rendered by the post page.
 * Opens once on first visit; following the link, "Continue to this article",
 * Escape or a backdrop click remembers the choice in localStorage, so it never
 * nags. Storage can be unavailable (private windows, blocked site data), so
 * every access is guarded and the modal simply shows again next time.
 */
export function RecommendModal({
  fromSlug,
  ...dialog
}: { fromSlug: string } & Omit<RecommendDialogProps, "open" | "onClose" | "onFollow">) {
  const storageKey = `gp-recommend-dismissed:${fromSlug}`;
  const [open, setOpen] = useState(false);

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

  return <RecommendDialog {...dialog} open={open} onClose={close} onFollow={remember} />;
}
