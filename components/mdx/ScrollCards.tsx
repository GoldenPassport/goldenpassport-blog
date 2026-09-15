type ScrollCardsProps = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

/**
 * A horizontally scrollable sequence for related editorial arguments.
 * The partially visible next card signals that more content follows, while
 * scroll snapping keeps touch and trackpad navigation tidy.
 */
export function ScrollCards({ label, hint = "Scroll through the cards", children }: ScrollCardsProps) {
  return (
    <section className="not-prose my-8" aria-label={label}>
      <div
        role="list"
        tabIndex={0}
        aria-label={`${label}. Scroll horizontally to read all cards.`}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-color:rgba(154,112,28,0.45)_transparent] [scrollbar-width:thin] sm:mx-0 sm:px-0"
      >
        {children}
      </div>
      <p className="mt-2 font-sans text-xs tracking-[0.08em] text-ink-mute">
        {hint}
      </p>
    </section>
  );
}

type ScrollCardProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export function ScrollCard({ number, title, children }: ScrollCardProps) {
  return (
    <article
      role="listitem"
      className="w-[84%] min-w-[17.5rem] shrink-0 snap-start rounded-lg border border-gold/25 bg-cream-50 p-6 sm:w-[62%] lg:w-[46%]"
    >
      <header className="mb-4 flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-deep font-sans text-xs font-semibold text-cream"
        >
          {number}
        </span>
        <h3 className="font-serif text-xl leading-snug text-ink">{title}</h3>
      </header>
      <div className="prose prose-base max-w-none font-serif text-ink-soft [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </article>
  );
}
