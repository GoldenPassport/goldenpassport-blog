"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A floating "back to top" button for long pages. It appears once the reader
 * has scrolled about a screen and a half down, and returns them to the top,
 * smoothly unless they prefer reduced motion.
 *
 * On posts below xl the contents button (PostToc) already sits bottom-right,
 * so this one stacks above it there.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const onPost = /^\/blog\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the top of the page too.
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={toTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-50 text-ink shadow-lg ring-1 ring-gold/40 transition-all duration-200 hover:bg-gold-deep hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep ${
        onPost ? "bottom-[5.25rem] xl:bottom-6" : "bottom-6"
      } ${visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
