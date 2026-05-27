type Brand = {
  name: string;
  note?: string;
  /** Path under /public/brands. If absent, the name is rendered as a styled wordmark. */
  logo?: string;
  /** Tailwind height class for per-logo optical balance. Defaults to h-12. */
  logoHeight?: string;
  /** Optional source URL backing a claim in `note` (e.g. the OMG BPMN spec). */
  source?: { href: string; label: string };
};

const BPMN_SPEC = "https://www.omg.org/spec/BPMN";
const JBPM_HOME = "https://www.jbpm.org/";
const UIPATH_GARTNER_MQ =
  "https://www.uipath.com/resources/automation-analyst-reports/gartner-magic-quadrant-robotic-process-automation";
const WEBMETHODS_WIKI = "https://en.wikipedia.org/wiki/WebMethods";

const SOFTWARE_BRANDS: Brand[] = [
  {
    name: "Red Hat",
    note: "Cloud, middleware, OpenShift. Where jBPM led the open-source workflow charge.",
    logo: "/brands/redhat.svg",
    logoHeight: "h-10",
    source: { href: JBPM_HOME, label: "jBPM project" },
  },
  {
    name: "UiPath",
    note: "RPA, process mining, agentic AI. Helped evangelise RPA and the early software robots that were a precursor to today’s AI agents.",
    logo: "/brands/uipath.svg",
    logoHeight: "h-14",
    source: { href: UIPATH_GARTNER_MQ, label: "Gartner RPA Leader" },
  },
  {
    name: "Software AG",
    note: "BPM, integration, APIs. Home of webMethods, one of the platforms that wired the enterprise together.",
    logo: "/brands/sag.png",
    source: { href: WEBMETHODS_WIKI, label: "webMethods" },
  },
  {
    name: "IDS Scheer AG",
    note: "ARIS, process architecture. A named contributor to the BPMN standard, and widely regarded as a founder of the BPM industry.",
    logo: "/brands/ids.png",
    logoHeight: "h-14",
    source: { href: BPMN_SPEC, label: "BPMN contributor" },
  },
];

const HYPERSCALERS: string[] = ["Microsoft Azure", "AWS", "Google Cloud", "IBM Cloud", "Oracle Cloud"];

function BrandTile({ brand }: { brand: Brand }) {
  return (
    <li className="rounded-lg border border-gold/25 bg-cream-50 px-4 py-5 flex flex-col items-start">
      {brand.logo ? (
        <div className="h-16 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className={`${brand.logoHeight ?? "h-12"} w-auto object-contain`}
          />
        </div>
      ) : (
        <div className="h-14 flex items-center">
          <span className="font-serif text-2xl text-ink leading-none tracking-tight">
            {brand.name}
          </span>
        </div>
      )}
      {brand.logo ? (
        <span className="mt-2 font-serif text-base text-ink leading-none">{brand.name}</span>
      ) : null}
      <span className="mt-2 text-xs text-ink-mute leading-snug">{brand.note}</span>
      {brand.source ? (
        <a
          href={brand.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[0.6875rem] tracking-[0.12em] uppercase font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep"
        >
          {brand.source.label}
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </li>
  );
}

export function BrandStrip() {
  return (
    <div className="not-prose my-10">
      <p className="text-xs tracking-[0.22em] uppercase text-ink-mute mb-4">
        Software companies I’ve built my craft at
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SOFTWARE_BRANDS.map((b) => (
          <BrandTile key={b.name} brand={b} />
        ))}
      </ul>

      <p className="text-xs tracking-[0.22em] uppercase text-ink-mute mt-10 mb-4">
        Hyperscalers I’ve partnered closely with
      </p>
      <ul className="flex flex-wrap gap-2">
        {HYPERSCALERS.map((name) => (
          <li
            key={name}
            className="rounded-full border border-gold/30 bg-cream-50 px-3.5 py-1.5 text-sm text-ink-soft"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
