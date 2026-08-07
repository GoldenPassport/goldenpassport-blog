import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllPosts, type PosterData } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

/**
 * Per-post Open Graph card generator (1200x630 PNG).
 *
 * Two layouts:
 *   - Poster card: when the post has `poster` frontmatter, the OG mirrors
 *     the on-page ReviewDashboard hero (verdict kicker, big name, pitch,
 *     market-reach stat, pros / cons). "The OG shows the hero."
 *   - Title card: otherwise, a clean branded card with the post title,
 *     category, reading time, and the site wordmark.
 *
 * Posts that set a static `ogImage`/`hero` opt out entirely (handled by
 * generateMetadata); see generateImageMetadata below.
 *
 * The brand serif is read from a bundled static woff (v1) at module load.
 * woff2 is deliberately avoided: Satori in the Node runtime cannot decode
 * it ("Unsupported OpenType signature wOF2"). Reading a local file means no
 * build-time network call. Falls back to the default font if the read fails.
 */

let serifFont: Buffer | null = null;
try {
  serifFont = readFileSync(
    join(process.cwd(), "public", "fonts", "CormorantGaramond-600.woff"),
  );
} catch {
  serifFont = null;
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return [];
  // Static override present: let generateMetadata own the og:image.
  if (post.ogImage || post.hero) return [];
  return [{ id: "card", size, contentType, alt: post.title }];
}

const C = {
  cream: "#FBF7EF",
  cream200: "#F5EDDC",
  ink: "#0F1B2D",
  inkSoft: "#2A3548",
  inkMute: "#5B6577",
  gold: "#B8893B",
  goldDeep: "#8C661F",
  emerald: "#047857",
  red: "#B91C1C",
};

/** Small white brand lockup (mark + goldenpassport.blog) for the dark
 *  banner. The mark path matches components/Brand.tsx's BrandMark. */
function BrandLockup() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      <svg width="42" height="22" viewBox="0 0 758 403">
        <path
          fill={C.cream}
          fillRule="evenodd"
          d="M 179.5 22.443 C 23.377 55.259, -49.729 351.5, 88.5 391.194 C 142.397 406.671, 229.175 372.892, 371.904 280.876 C 381.918 274.42, 384.535 273.132, 385.488 274.19 C 482.518 381.897, 515.361 401.598, 583.624 393.041 C 671.647 382.006, 747.782 278.752, 744.727 174.556 C 741.911 78.54, 651.14 73.899, 498.5 161.968 C 462.181 182.923, 445.855 192.866, 406.101 218.239 C 397.632 223.645, 390.344 227.94, 389.906 227.784 C 389.469 227.628, 385.198 223.225, 380.416 218 C 320.449 152.478, 262.07 106.646, 221.282 93.07 C 209.752 89.232, 209.568 89.361, 202.428 106.275 C 195.084 123.674, 194.896 122.854, 207.166 126.95 C 248.347 140.7, 302.114 181.587, 352.839 237.729 C 361.178 246.958, 361.178 246.958, 346.839 256.327 C 118.773 405.356, 34.789 392.64, 93.701 218 C 130.905 107.711, 195.627 47.129, 248.5 73.102 C 253.834 75.723, 257.295 78.112, 272.132 89.413 C 278.545 94.298, 304.842 68.166, 299.683 62.035 C 272.198 29.371, 223.251 13.247, 179.5 22.443 M 656.5 135.594 C 607.444 142.435, 527.008 180.684, 421.751 247.221 C 411.8 253.511, 410.51 250.777, 436.509 278.5 C 443.214 285.65, 450.23 293.264, 452.1 295.42 C 527.288 382.109, 603.908 361.997, 669.122 238.455 C 705.956 168.674, 701.133 129.369, 656.5 135.594"
        />
      </svg>
      <div style={{ display: "flex", marginLeft: 12, fontSize: 20, color: C.cream, fontWeight: 600 }}>
        goldenpassport.blog
      </div>
    </div>
  );
}

function fonts() {
  return serifFont
    ? [
        {
          name: "Cormorant Garamond",
          data: serifFont,
          weight: 600 as const,
          style: "normal" as const,
        },
      ]
    : undefined;
}
const titleFont = serifFont ? "Cormorant Garamond" : "serif";

/** Poster-style card: a Satori rendition of the ReviewDashboard hero. */
function PosterCard({ poster }: { poster: PosterData }) {
  const reachMax = poster.reach.bars?.length
    ? Math.max(...poster.reach.bars.map((b) => b.value))
    : 1;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.cream }}>
      {/* Verdict banner: kicker on the left, brand lockup on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: C.ink,
          padding: "14px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: C.cream,
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {(poster.kicker ?? "Review summary").toUpperCase()}
        </div>
        <BrandLockup />
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 56px" }}>
        {/* Name + reach row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
            <div style={{ display: "flex", fontFamily: titleFont, fontSize: 84, color: C.ink, fontWeight: 600, lineHeight: 1 }}>
              {poster.name}
            </div>
            <div style={{ display: "flex", fontFamily: titleFont, fontSize: 38, color: C.inkSoft, marginTop: 14, fontStyle: "italic" }}>
              {poster.pitch}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: 430 }}>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: C.goldDeep, fontWeight: 600, marginBottom: 12 }}>
              {poster.reach.label ?? "Market reach"}
            </div>
            {poster.reach.bars && poster.reach.bars.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {poster.reach.bars.map((b, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                      <div style={{ display: "flex", fontSize: 20, color: b.highlight ? C.ink : C.inkSoft, fontWeight: b.highlight ? 600 : 400 }}>{b.label}</div>
                      <div style={{ display: "flex", fontSize: 18, color: C.inkMute }}>{b.display}</div>
                    </div>
                    <div style={{ display: "flex", width: "100%", height: 14, background: "rgba(15,27,45,0.06)", borderRadius: 3, position: "relative" }}>
                      <div style={{ display: "flex", position: "absolute", top: 0, bottom: 0, left: 0, width: `${(b.value / reachMax) * 100}%`, background: b.highlight ? C.goldDeep : "rgba(15,27,45,0.3)", borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", fontFamily: titleFont, fontSize: 64, color: C.ink, fontWeight: 600, lineHeight: 1 }}>
                {poster.reach.primary}
              </div>
            )}
            {/* Meta as a tight, connected segmented button-group sitting under
                the downloads chart: one rounded container, internal dividers
                between segments (Tailwind UI button-group style). */}
            {poster.meta && poster.meta.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 12,
                  border: `1px solid ${C.gold}`,
                  borderRadius: 8,
                  background: "rgba(184,137,59,0.08)",
                  overflow: "hidden",
                }}
              >
                {poster.meta.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      padding: "6px 14px",
                      borderRight:
                        i < poster.meta.length - 1
                          ? `1px solid rgba(184,137,59,0.4)`
                          : "none",
                    }}
                  >
                    <div style={{ display: "flex", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.goldDeep, fontWeight: 600, marginRight: 6 }}>
                      {m.label}
                    </div>
                    <div style={{ display: "flex", fontSize: 15, color: C.ink, fontWeight: 600 }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Spacer: pushes the problem block down so it sits just above the
            rule rather than floating below the hero. */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* The problem it solves. Heading-to-points gap (24) matches the
            pros/cons headings below for a consistent rhythm. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: C.goldDeep, fontWeight: 600, marginBottom: 18 }}>
            The problem it solves
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {poster.problems.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", fontSize: 22, color: C.inkSoft, marginRight: 40 }}>
                <div style={{ display: "flex", width: 10, height: 10, borderRadius: 5, background: C.gold, marginRight: 10, flexShrink: 0 }} />
                {p.title}
              </div>
            ))}
          </div>
        </div>

        {/* Gold rule, centred: equal gap to the problem points above and the
            pros/cons headings below. */}
        <div style={{ display: "flex", height: 2, background: C.gold, opacity: 0.4, margin: "20px 0" }} />

        {/* Pros / cons. Headings hug the rule; a gap separates each heading
            from its points. Natural height (not flex:1) so only the top
            spacer absorbs slack and the block never overflows the card. */}
        <div style={{ display: "flex", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: C.emerald, fontWeight: 600, marginBottom: 18 }}>
              What is good
            </div>
            {poster.pros.slice(0, 3).map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", fontSize: 22, color: C.inkSoft, marginBottom: 8 }}>
                <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: C.emerald, marginRight: 12, marginTop: 9, flexShrink: 0 }} />
                <div style={{ display: "flex" }}>{p}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: C.red, fontWeight: 600, marginBottom: 18 }}>
              Where the gaps are
            </div>
            {poster.cons.slice(0, 3).map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", fontSize: 22, color: C.inkSoft, marginBottom: 8 }}>
                <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: C.red, marginRight: 12, marginTop: 9, flexShrink: 0 }} />
                <div style={{ display: "flex" }}>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Title card: clean branded card for posts without a poster. */
function TitleCard({
  title,
  kicker,
  metaLine,
}: {
  title: string;
  kicker: string;
  metaLine: string;
}) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.cream, padding: "64px 72px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: C.gold }} />
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: C.goldDeep, fontWeight: 600 }}>{kicker}</div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: 24, marginBottom: 24 }}>
        <div style={{ fontFamily: titleFont, fontSize: title.length > 48 ? 80 : 104, lineHeight: 1.05, color: C.ink, fontWeight: 600, display: "flex" }}>
          {title}
        </div>
      </div>
      {metaLine ? (
        <div style={{ display: "flex", fontSize: 28, color: C.inkMute, marginBottom: 20 }}>{metaLine}</div>
      ) : null}
      <div style={{ display: "flex", height: 2, background: C.gold, opacity: 0.4 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        <div style={{ display: "flex", fontSize: 30, color: C.ink, fontWeight: 600 }}>goldenpassport.blog</div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: C.goldDeep, fontWeight: 600 }}>LUKE AUDIE</div>
      </div>
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  const card = post?.poster ? (
    <PosterCard poster={post.poster} />
  ) : (
    <TitleCard
      title={post?.title ?? SITE_NAME}
      kicker={post?.series ? post.series.toUpperCase() : "GOLDEN PASSPORT"}
      metaLine={[post?.category, post?.readingTime].filter(Boolean).join("  ·  ")}
    />
  );

  const fontList = fonts();
  return new ImageResponse(card, { ...size, ...(fontList ? { fonts: fontList } : {}) });
}
