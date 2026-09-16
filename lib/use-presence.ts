"use client";

import { useEffect, useState } from "react";

/**
 * Keeps an overlay mounted long enough to animate out.
 *
 *   const { mounted, shown } = usePresence(open);
 *   {mounted ? <div className={shown ? "opacity-100" : "opacity-0"} /> : null}
 *
 * - `mounted` is true while open and for `duration` ms after closing, so the
 *   closing transition can play before the element is removed.
 * - `shown` turns true a frame after mounting (so the opening transition runs
 *   from the hidden state) and false as soon as `open` goes false.
 *
 * Pair `shown` with Tailwind transition classes; add pointer-events-none when
 * not shown so a closing overlay never swallows clicks. Under
 * prefers-reduced-motion the global CSS shortens transitions to near zero.
 */
export function usePresence(open: boolean, duration = 220) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);

  // Mount straight away when opened (state adjusted during render, which
  // React allows for derived state like this).
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open) {
      // Two frames: the first paints the hidden state, the second transitions.
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    // Closing: `shown` below is already false; unmount once the transition
    // has played and reset for the next opening.
    const timer = window.setTimeout(() => {
      setMounted(false);
      setShown(false);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration]);

  return { mounted: open || mounted, shown: open && shown };
}
