type Props = {
  href: string;
  title: string;
  children?: React.ReactNode;
};

/** A prominent link to a downloadable collection or repository. */
export function DownloadCallout({ href, title, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="not-prose group my-8 flex items-center gap-4 rounded-lg border border-gold/35 bg-gold/[0.08] px-5 py-5 text-ink no-underline shadow-sm transition-colors hover:border-gold-deep hover:bg-gold/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep sm:px-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-deep text-cream-50 transition-colors group-hover:bg-ink">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 20h14" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
          Download the complete project
        </span>
        <span className="mt-1 block font-serif text-xl font-semibold leading-tight text-ink group-hover:text-gold-deep">
          {title}
        </span>
        {children ? (
          <span className="mt-1.5 block font-sans text-sm leading-relaxed text-ink-mute">
            {children}
          </span>
        ) : null}
      </span>
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="hidden shrink-0 text-gold-deep transition-transform group-hover:translate-x-1 sm:block"
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </a>
  );
}
