"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getCookieConsent } from "@/components/CookieConsent";

/**
 * Vercel Analytics, gated behind the visitor's cookie-consent choice.
 *
 * Vercel Analytics is cookieless and doesn't collect PII, but the privacy
 * page on this site promises that no analytics load before the visitor has
 * explicitly accepted. This wrapper enforces that promise:
 *
 *  - On mount, read the consent state from localStorage.
 *  - Subscribe to the `gp:cookie-consent` CustomEvent that CookieConsent
 *    dispatches when the user accepts or declines, so the analytics start
 *    or stop loading without a page refresh.
 *  - Only render <Analytics /> when state is "accepted".
 *
 * If the visitor later clears their cookie / consent (per the instructions
 * on the privacy page), this component reverts to rendering nothing on the
 * next page load.
 */
export function ConsentedAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getCookieConsent() === "accepted");
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setConsented(detail === "accepted");
    };
    window.addEventListener("gp:cookie-consent", onChange);
    return () => window.removeEventListener("gp:cookie-consent", onChange);
  }, []);

  if (!consented) return null;
  return <Analytics />;
}
