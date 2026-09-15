/**
 * A test id badge, e.g. T06. One style for every place a test conversation is
 * referenced: the Test conversations list, evidence dialogs and running text.
 * Uses the sans face so the digits never render as old-style figures.
 *
 *   The phone change (<TestId>T06</TestId>) paused for approval.
 */
export function TestId({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`not-prose inline-flex items-center rounded-full border border-gold/35 bg-gold/[0.08] px-2 py-[0.2rem] align-[0.12em] font-sans text-[0.68rem] font-semibold uppercase leading-none tracking-[0.08em] text-gold-deep ${className}`}
    >
      {children}
    </span>
  );
}
