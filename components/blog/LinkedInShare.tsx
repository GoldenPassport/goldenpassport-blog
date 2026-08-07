"use client";

/**
 * "Share on LinkedIn" button for the bottom of post pages.
 *
 * Renders as an ink-background pill that matches the site's CTA vocabulary
 * (like the "Go to the demo" button). The LinkedIn glyph carries the
 * brand recognition; hover transitions to LinkedIn-blue. Clicking opens
 * LinkedIn's share-offsite dialog in a popup window, with a graceful
 * fallback to a new tab when popups are blocked.
 *
 * The href is a real LinkedIn share URL, so the button works without
 * JavaScript (server-rendered as a plain link) — the popup behaviour is
 * a nice-to-have on top.
 */
export function LinkedInShare({ url, title }: { url: string; title?: string }) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try to open in a centred popup; fall back to new tab if blocked.
    const popup = window.open(
      shareUrl,
      "linkedin-share",
      "width=600,height=600,scrollbars=yes,resizable=yes,noopener=yes",
    );
    if (popup) {
      e.preventDefault();
      popup.focus();
    }
    // If popup is null (blocker), default <a> click navigates in a new tab
    // because of target="_blank" — no preventDefault, browser handles it.
  };

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={title ? `Share "${title}" on LinkedIn` : "Share this post on LinkedIn"}
      className="not-prose inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-medium no-underline hover:bg-[#0a66c2] transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      Share on LinkedIn
    </a>
  );
}
