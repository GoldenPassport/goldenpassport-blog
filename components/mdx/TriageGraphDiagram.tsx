/**
 * Illustration of the document-intake triage graph built in the LangGraph
 * demo. A vertical pipeline (classify → extract → validate → decide) that
 * fans out at the decide node into three outcome branches (auto-process,
 * human-review, reject) which converge on END.
 *
 * Colour coding makes the branch semantics readable at a glance:
 *   - START / END:  gold-deep filled discs
 *   - Pipeline:     cream tiles with a gold border (decide is emphasised)
 *   - auto-process: sage / emerald-tinted (positive outcome)
 *   - human-review: cream-200 / ink-soft (neutral pause)
 *   - reject:       red-tinted (negative outcome)
 *
 * Self-contained SVG, no external deps, scales to any width via the parent
 * figure's max-width. Used in the LangGraph demo MDX as "The graph we'll
 * build".
 */

const COLOURS = {
  goldDeep: "#b08538",
  goldBorder: "#c9a14a",
  cream: "#fbf6ea",
  cream50: "#fdfaf2",
  cream200: "#efe4cf",
  ink: "#1f1d1a",
  inkMute: "#8a847a",
  emeraldFill: "#ecfdf5",
  emeraldStroke: "#047857",
  amberFill: "#fffbeb",
  amberStroke: "#b45309",
  redFill: "#fef2f2",
  redStroke: "#b91c1c",
} as const;

export function TriageGraphDiagram() {
  return (
    <figure className="not-prose my-8 p-4 sm:p-6 rounded-lg border border-gold/25 bg-cream-50">
      <p className="text-sm tracking-[0.22em] uppercase text-gold-deep font-semibold mb-5">
        The graph we&apos;ll build
      </p>
      <svg
        viewBox="0 0 700 460"
        className="w-full h-auto max-w-2xl mx-auto"
        role="img"
        aria-label="Triage graph: START flows through classify, extract, validate, decide; then branches to auto-process, human-review, or reject; all three converge on END."
      >
        <defs>
          {/* Filled arrowhead reused by every edge. Sized small so it does
              not overpower the line itself. */}
          <marker
            id="tg-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={COLOURS.goldDeep} />
          </marker>
        </defs>

        {/* ---------- Edges (drawn first so nodes sit on top) ---------- */}
        <g
          stroke={COLOURS.goldDeep}
          strokeWidth="2"
          fill="none"
          markerEnd="url(#tg-arrow)"
        >
          {/* Vertical pipeline */}
          <line x1="350" y1="50" x2="350" y2="68" />
          <line x1="350" y1="110" x2="350" y2="128" />
          <line x1="350" y1="170" x2="350" y2="188" />
          <line x1="350" y1="230" x2="350" y2="248" />

          {/* decide → three branches (curves fan out left and right) */}
          <path d="M 350 290 C 350 310, 140 310, 140 328" />
          <line x1="350" y1="290" x2="350" y2="328" />
          <path d="M 350 290 C 350 310, 560 310, 560 328" />

          {/* three branches → END (curves converge back to centre). The
              endpoints sit 2px above the END circle's top (y=394) so the
              arrowheads land on the circle's edge rather than inside it. */}
          <path d="M 140 370 C 140 390, 350 390, 350 392" />
          <line x1="350" y1="370" x2="350" y2="392" />
          <path d="M 560 370 C 560 390, 350 390, 350 392" />
        </g>

        {/* ---------- START disc ---------- */}
        <g>
          <circle cx="350" cy="30" r="26" fill={COLOURS.goldDeep} />
          <text
            x="350"
            y="35"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLOURS.cream}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.1em"
          >
            START
          </text>
        </g>

        {/* ---------- Pipeline boxes ---------- */}
        {[
          { y: 70, label: "classify", emphasised: false },
          { y: 130, label: "extract", emphasised: false },
          { y: 190, label: "validate", emphasised: false },
          { y: 250, label: "decide", emphasised: true },
        ].map((n) => (
          <g key={n.label}>
            <rect
              x="280"
              y={n.y}
              width="140"
              height="40"
              rx="6"
              fill={n.emphasised ? COLOURS.cream200 : COLOURS.cream50}
              stroke={COLOURS.goldDeep}
              strokeWidth={n.emphasised ? "2.25" : "1.5"}
            />
            <text
              x="350"
              y={n.y + 25}
              textAnchor="middle"
              fontSize="14"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fill={COLOURS.ink}
              fontWeight={n.emphasised ? "700" : "500"}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* ---------- Branch outcome boxes ---------- */}
        <g>
          <rect
            x="60"
            y="330"
            width="160"
            height="40"
            rx="6"
            fill={COLOURS.emeraldFill}
            stroke={COLOURS.emeraldStroke}
            strokeWidth="1.5"
          />
          <text
            x="140"
            y="355"
            textAnchor="middle"
            fontSize="14"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fill={COLOURS.emeraldStroke}
            fontWeight="600"
          >
            auto-process
          </text>
        </g>
        <g>
          <rect
            x="270"
            y="330"
            width="160"
            height="40"
            rx="6"
            fill={COLOURS.amberFill}
            stroke={COLOURS.amberStroke}
            strokeWidth="1.5"
          />
          <text
            x="350"
            y="355"
            textAnchor="middle"
            fontSize="14"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fill={COLOURS.amberStroke}
            fontWeight="600"
          >
            human-review
          </text>
        </g>
        <g>
          <rect
            x="480"
            y="330"
            width="160"
            height="40"
            rx="6"
            fill={COLOURS.redFill}
            stroke={COLOURS.redStroke}
            strokeWidth="1.5"
          />
          <text
            x="560"
            y="355"
            textAnchor="middle"
            fontSize="14"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fill={COLOURS.redStroke}
            fontWeight="600"
          >
            reject
          </text>
        </g>

        {/* ---------- END disc ---------- */}
        <g>
          <circle cx="350" cy="420" r="26" fill={COLOURS.goldDeep} />
          <text
            x="350"
            y="425"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLOURS.cream}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.1em"
          >
            END
          </text>
        </g>
      </svg>
    </figure>
  );
}
