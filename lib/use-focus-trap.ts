import { useEffect, type RefObject } from "react";

/**
 * Keep keyboard focus inside `ref` while `active` is true.
 *
 * Our modals already move focus in on open, restore it on close, and close on
 * Escape / backdrop click — this adds the missing piece: Tab / Shift+Tab cycle
 * within the dialog instead of escaping to the page behind the overlay
 * (WCAG 2.4.3 / 2.1.2). No-op when inactive or the container is empty.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]',
        ),
      ).filter(
        // Skip elements hidden via display:none (offsetParent null) and any
        // explicitly removed from the tab order (tabindex="-1", e.g. a
        // mouse-only backdrop).
        (n) => n.offsetParent !== null && n.getAttribute("tabindex") !== "-1",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (e.shiftKey) {
        if (current === first || !el.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else if (current === last || !el.contains(current)) {
        e.preventDefault();
        first.focus();
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [ref, active]);
}
