"use client";

import { useEffect, useState } from "react";

/**
 * Cookie consent banner.
 *
 * GDPR / UK PECR friendly defaults:
 * - No analytics or tracking cookies are set before the user makes a choice.
 * - The choice is stored in localStorage under STORAGE_KEY so the banner only
 *   appears on first visit.
 * - "Decline" is a real choice: same dismiss behaviour as "Accept" with the
 *   value persisted so future code can gate analytics on it.
 *
 * To consume the consent state elsewhere (e.g. before mounting a tracker):
 *
 *   import { getCookieConsent } from "@/components/consent/CookieConsent";
 *   if (getCookieConsent() === "accepted") { ...initialise analytics... }
 *
 * A `gp:cookie-consent` CustomEvent is dispatched on window when the choice
 * changes, so client code can subscribe to it instead of polling.
 */

const STORAGE_KEY = "gp-cookie-consent";
type ConsentValue = "accepted" | "declined";

export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    // Storage can be unavailable when browser privacy settings block
    // persistence. Treat that like a first visit so the choice remains usable.
    return null;
  }
}

function setCookieConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // The choice cannot survive a reload, but it should still take effect for
    // this page. Dispatching below keeps analytics in sync for this session.
  }
  window.dispatchEvent(new CustomEvent("gp:cookie-consent", { detail: value }));
}

export function CookieConsent() {
  // Render nothing on the server, and on the client until we've checked storage.
  // This prevents a flash of the banner for returning visitors.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    setCookieConsent(value);
    setVisible(false);
  };

  return (
    <aside
      // Not a real modal dialog (no focus trap, no required interaction),
      // so `role="dialog"` would mislead assistive tech. `region` + label
      // tells SRs this is a discrete chunk of content they can navigate to;
      // `aria-live="polite"` announces it on appearance for users who do
      // not navigate the landmarks list manually.
      role="region"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50"
    >
      <div className="rounded-xl border border-gold/30 bg-cream-50 shadow-lg backdrop-blur p-5">
        <p className="font-serif text-lg text-ink leading-snug">
          A small note on cookies.
        </p>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">
          If you accept, this site loads privacy-friendly Vercel Web Analytics to record anonymous,
          aggregate page views. It uses no cookies, personal identifiers, advertising, or
          cross-site tracking. Declining keeps analytics switched off.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex items-center px-4 py-2 rounded-full bg-ink text-cream text-sm font-medium hover:bg-gold-deep transition-colors"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="inline-flex items-center px-4 py-2 rounded-full border border-gold/40 text-ink-soft text-sm font-medium hover:border-gold hover:text-gold-deep transition-colors"
          >
            Decline
          </button>
          <a
            href="/privacy"
            className="ml-auto text-xs text-ink-mute underline underline-offset-2 hover:text-gold-deep"
          >
            Privacy
          </a>
        </div>
      </div>
    </aside>
  );
}
