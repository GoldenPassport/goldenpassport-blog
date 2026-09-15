"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Post headings with a shareable link. On hover (or keyboard focus) the
 * heading text is underlined and a link icon appears beside it. Activating the
 * icon copies a URL to that section (`page#heading-id`) to the clipboard and
 * shows a brief "Copied" note.
 *
 * Ids come from rehype-slug. The icon button carries no text content, and the
 * "Copied" note is a CSS pseudo-element, so `heading.textContent` stays the
 * heading text alone (the "On this page" list reads it).
 *
 * Registered as `h2` and `h3` in the MDX component maps.
 */
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

function makeHeading(Tag: "h2" | "h3") {
  function Heading({ id, children, className = "", ...rest }: HeadingProps) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    useEffect(() => () => window.clearTimeout(timer.current), []);

    if (!id) {
      return (
        <Tag className={className} {...rest}>
          {children}
        </Tag>
      );
    }

    const copy = async () => {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1800);
      } catch {
        // Clipboard unavailable: fall back to putting the anchor in the URL.
        window.history.replaceState(null, "", `#${id}`);
      }
    };

    return (
      <Tag id={id} className={`group/heading relative scroll-mt-24 ${className}`} {...rest}>
        <span className="decoration-gold-deep/60 decoration-2 underline-offset-[0.2em] group-hover/heading:underline group-focus-within/heading:underline">
          {children}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Link copied" : "Copy link to this section"}
          data-copied={copied ? "true" : undefined}
          className="not-prose relative ml-2 inline-flex h-7 w-7 items-center justify-center rounded-md align-middle text-gold-deep opacity-0 transition-opacity hover:bg-gold/10 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep group-hover/heading:opacity-100 [@media(hover:none)]:opacity-60 data-[copied=true]:opacity-100 after:pointer-events-none after:absolute after:left-full after:ml-1.5 after:whitespace-nowrap after:rounded after:bg-ink after:px-1.5 after:py-0.5 after:font-sans after:text-[0.6875rem] after:font-semibold after:leading-none after:tracking-normal after:text-cream after:opacity-0 after:transition-opacity after:content-['Copied'] data-[copied=true]:after:opacity-100"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </Tag>
    );
  }
  Heading.displayName = `Heading${Tag.toUpperCase()}`;
  return Heading;
}

export const HeadingH2 = makeHeading("h2");
export const HeadingH3 = makeHeading("h3");
