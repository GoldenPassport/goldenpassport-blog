/**
 * Golden Passport brand lockup.
 *
 * - `BrandMark` renders just the SVG mark (uses currentColor for tinting).
 * - `Brand` is the configurable mark + wordmark lockup.
 * - `BrandXs`, `BrandSm`, `BrandMd`, `BrandLg`, `BrandHero` are size presets.
 * - `BrandResponsive` is the recommended choice for site chrome (Header / Footer):
 *   shows just the mark on small viewports, full lockup from `sm:` (640px) up.
 *
 * The mark inherits its colour from `currentColor`. Put the lockup inside a
 * parent with a `text-gold-*` utility (and `group` if you want hover styling)
 * and the mark will follow that colour.
 */

type Size = "xs" | "sm" | "md" | "lg" | "hero";

const SIZE_PRESETS: Record<Size, { mark: string; wordmark: string; gap: string }> = {
  xs: { mark: "h-5", wordmark: "text-base", gap: "gap-2" },
  sm: { mark: "h-6", wordmark: "text-lg", gap: "gap-2.5" },
  md: { mark: "h-7", wordmark: "text-xl", gap: "gap-3" },
  lg: { mark: "h-9", wordmark: "text-2xl", gap: "gap-3.5" },
  hero: { mark: "h-14", wordmark: "text-4xl md:text-5xl", gap: "gap-5" },
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 758 403"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Golden Passport mark"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M 179.5 22.443 C 23.377 55.259, -49.729 351.5, 88.5 391.194 C 142.397 406.671, 229.175 372.892, 371.904 280.876 C 381.918 274.42, 384.535 273.132, 385.488 274.19 C 482.518 381.897, 515.361 401.598, 583.624 393.041 C 671.647 382.006, 747.782 278.752, 744.727 174.556 C 741.911 78.54, 651.14 73.899, 498.5 161.968 C 462.181 182.923, 445.855 192.866, 406.101 218.239 C 397.632 223.645, 390.344 227.94, 389.906 227.784 C 389.469 227.628, 385.198 223.225, 380.416 218 C 320.449 152.478, 262.07 106.646, 221.282 93.07 C 209.752 89.232, 209.568 89.361, 202.428 106.275 C 195.084 123.674, 194.896 122.854, 207.166 126.95 C 248.347 140.7, 302.114 181.587, 352.839 237.729 C 361.178 246.958, 361.178 246.958, 346.839 256.327 C 118.773 405.356, 34.789 392.64, 93.701 218 C 130.905 107.711, 195.627 47.129, 248.5 73.102 C 253.834 75.723, 257.295 78.112, 272.132 89.413 C 278.545 94.298, 304.842 68.166, 299.683 62.035 C 272.198 29.371, 223.251 13.247, 179.5 22.443 M 656.5 135.594 C 607.444 142.435, 527.008 180.684, 421.751 247.221 C 411.8 253.511, 410.51 250.777, 436.509 278.5 C 443.214 285.65, 450.23 293.264, 452.1 295.42 C 527.288 382.109, 603.908 361.997, 669.122 238.455 C 705.956 168.674, 701.133 129.369, 656.5 135.594"
      />
    </svg>
  );
}

type BrandProps = {
  /** One of the named size presets. Defaults to `md`. */
  size?: Size;
  /** Hide the "Golden Passport" wordmark; render the mark on its own. */
  markOnly?: boolean;
  /** Stack the wordmark over two lines ("Golden" / "Passport"). */
  stacked?: boolean;
  /** Extra classes on the outer container. */
  className?: string;
  /** Override classes applied to the wordmark span (e.g. for responsive show/hide). */
  wordmarkClassName?: string;
  /** Small label rendered under the wordmark, e.g. "Blog". Ignored when
   *  `markOnly` (there is no wordmark to sit beneath). */
  subLabel?: string;
};

export function Brand({
  size = "md",
  markOnly = false,
  stacked = false,
  className = "",
  wordmarkClassName = "",
  subLabel,
}: BrandProps) {
  const preset = SIZE_PRESETS[size];
  return (
    <span className={`inline-flex items-center ${preset.gap} ${className}`}>
      <span className="text-gold-deep group-hover:text-gold transition-colors">
        <BrandMark className={`${preset.mark} w-auto`} />
      </span>
      {markOnly ? null : stacked ? (
        <span
          className={`font-serif ${preset.wordmark} text-ink tracking-tight leading-[1.05] ${wordmarkClassName}`}
        >
          <span className="block">Golden</span>
          <span className="block text-gold-deep">Passport</span>
        </span>
      ) : (
        // `relative` wordmark with the subLabel absolutely positioned below it,
        // so the subLabel does not add to the lockup's height. That keeps the
        // mark vertically centred on the "Golden Passport" line (via the outer
        // items-center) instead of sagging to the centre of name + subLabel.
        <span className="relative inline-flex">
          <span
            className={`font-serif ${preset.wordmark} text-ink tracking-tight leading-none ${wordmarkClassName}`}
          >
            Golden <span className="text-gold-deep">Passport</span>
          </span>
          {subLabel ? (
            <span className="absolute left-0 top-full mt-1 font-sans text-[0.6rem] font-bold uppercase tracking-[0.28em] text-ink-mute">
              {subLabel}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Prebuilt size variants                                                     */
/* -------------------------------------------------------------------------- */

export const BrandXs = (p: Omit<BrandProps, "size">) => <Brand size="xs" {...p} />;
export const BrandSm = (p: Omit<BrandProps, "size">) => <Brand size="sm" {...p} />;
export const BrandMd = (p: Omit<BrandProps, "size">) => <Brand size="md" {...p} />;
export const BrandLg = (p: Omit<BrandProps, "size">) => <Brand size="lg" {...p} />;
export const BrandHero = (p: Omit<BrandProps, "size">) => <Brand size="hero" {...p} />;

/* -------------------------------------------------------------------------- */
/* Responsive variant                                                         */
/*                                                                            */
/* Renders the small mark-only lockup at < 640px, then upgrades to the full   */
/* md lockup at sm:, then to lg at lg:. Implemented by stacking three Brand   */
/* instances with `hidden` / `*:flex` utilities. Tailwind tree-shakes the     */
/* unused presets at build time, so the cost at runtime is one render.        */
/* -------------------------------------------------------------------------- */

export function BrandResponsive({
  className = "",
  subLabel,
}: {
  className?: string;
  subLabel?: string;
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* < 640px: mark only. The "Golden Passport" wordmark is dropped here to
          keep the header uncluttered; it still appears in the footer. The
          subLabel needs the wordmark to sit under, so it is omitted here too. */}
      <span className="inline-flex sm:hidden">
        <Brand size="md" markOnly />
      </span>
      {/* 640px – 1023px: full lockup, md */}
      <span className="hidden sm:inline-flex lg:hidden">
        <Brand size="md" subLabel={subLabel} />
      </span>
      {/* 1024px+: full lockup, slightly larger */}
      <span className="hidden lg:inline-flex">
        <Brand size="lg" subLabel={subLabel} />
      </span>
    </span>
  );
}
