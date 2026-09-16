/**
 * A grid of short named ideas, each a term with a sentence or two of
 * explanation. Use it for sets of principles, pillars or criteria that read
 * better scanned than as a long bold-led bullet list.
 *
 *   <DefinitionGrid>
 *
 *   <DefinitionItem term="Identity and authorisation first" icon="identity">
 *
 *   Nothing about a person is retrieved until their identity is known.
 *
 *   </DefinitionItem>
 *
 *   </DefinitionGrid>
 *
 * `icon` is optional and names one of the built-in line icons below.
 * `status` adds a small pill under the term, such as "Tested in n8n", with
 * `statusTone` of done, partial or planned.
 * One column on phones, two from the small breakpoint. Rendered as a
 * description list for assistive technology.
 */

const ICONS = {
  identity: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <polyline points="16 11 18 13 22 9" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  memory: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  gauge: (
    <>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </>
  ),
  loop: (
    <>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
} as const;

export type DefinitionIcon = keyof typeof ICONS;

/** Every icon name `DefinitionItem` accepts, for stories and docs. */
export const DEFINITION_ICONS = Object.keys(ICONS) as DefinitionIcon[];

export function DefinitionGrid({ children }: { children: React.ReactNode }) {
  return <dl className="not-prose m-0 my-8 grid gap-4 sm:grid-cols-2">{children}</dl>;
}

const STATUS_TONE = {
  done: "border-emerald-700/25 bg-emerald-50 text-emerald-800",
  partial: "border-amber-600/30 bg-amber-50 text-amber-800",
  planned: "border-ink/15 bg-ink/5 text-ink-mute",
} as const;

export function DefinitionItem({
  term,
  icon,
  status,
  statusTone = "planned",
  children,
}: {
  term: string;
  /** Optional line icon shown before the term. */
  icon?: DefinitionIcon;
  /** Optional short status, e.g. "Tested in n8n". */
  status?: string;
  /** Colour of the status pill. */
  statusTone?: keyof typeof STATUS_TONE;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gold/20 bg-cream-50 p-4 ring-1 ring-gold/[0.06] sm:p-5">
      <dt className="flex items-center gap-3 font-serif text-lg font-semibold leading-snug text-ink">
        {icon ? (
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold-deep ring-1 ring-gold/20"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[icon]}
            </svg>
          </span>
        ) : null}
        <span>{term}</span>
      </dt>
      {status ? (
        <dd className="m-0 mt-2">
          <span className={`inline-flex rounded-full border px-2.5 py-1 font-sans text-[0.625rem] font-semibold uppercase leading-none tracking-[0.12em] ${STATUS_TONE[statusTone]}`}>
            {status}
          </span>
        </dd>
      ) : null}
      <dd className="m-0 mt-1.5 font-serif text-base leading-relaxed text-ink-soft [&_p]:m-0 [&_strong]:text-ink">
        {children}
      </dd>
    </div>
  );
}
