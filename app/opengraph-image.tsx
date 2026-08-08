import { ImageResponse } from "next/og";

/**
 * Site-wide default Open Graph image. Renders a 1200×630 PNG with the brand
 * mark on cream, plus the wordmark and a one-liner. Used as the og:image
 * for any page that doesn't define its own (the home, about, contact,
 * privacy, blog index, and any blog post without a `hero` field).
 */

export const alt = "Golden Passport: writing on automation by Luke Audie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK_PATH =
  "M 179.5 22.443 C 23.377 55.259, -49.729 351.5, 88.5 391.194 C 142.397 406.671, 229.175 372.892, 371.904 280.876 C 381.918 274.42, 384.535 273.132, 385.488 274.19 C 482.518 381.897, 515.361 401.598, 583.624 393.041 C 671.647 382.006, 747.782 278.752, 744.727 174.556 C 741.911 78.54, 651.14 73.899, 498.5 161.968 C 462.181 182.923, 445.855 192.866, 406.101 218.239 C 397.632 223.645, 390.344 227.94, 389.906 227.784 C 389.469 227.628, 385.198 223.225, 380.416 218 C 320.449 152.478, 262.07 106.646, 221.282 93.07 C 209.752 89.232, 209.568 89.361, 202.428 106.275 C 195.084 123.674, 194.896 122.854, 207.166 126.95 C 248.347 140.7, 302.114 181.587, 352.839 237.729 C 361.178 246.958, 361.178 246.958, 346.839 256.327 C 118.773 405.356, 34.789 392.64, 93.701 218 C 130.905 107.711, 195.627 47.129, 248.5 73.102 C 253.834 75.723, 257.295 78.112, 272.132 89.413 C 278.545 94.298, 304.842 68.166, 299.683 62.035 C 272.198 29.371, 223.251 13.247, 179.5 22.443 M 656.5 135.594 C 607.444 142.435, 527.008 180.684, 421.751 247.221 C 411.8 253.511, 410.51 250.777, 436.509 278.5 C 443.214 285.65, 450.23 293.264, 452.1 295.42 C 527.288 382.109, 603.908 361.997, 669.122 238.455 C 705.956 168.674, 701.133 129.369, 656.5 135.594";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FBF7EF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        {/* Top: mark */}
        <svg width="320" height="170" viewBox="0 0 758 403" xmlns="http://www.w3.org/2000/svg">
          <path fill="#B8893B" fillRule="evenodd" d={MARK_PATH} />
        </svg>

        {/* Bottom: wordmark and tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 84,
              fontFamily: "serif",
              color: "#0F1B2D",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "flex",
              gap: 16,
            }}
          >
            <span>Golden</span>
            <span style={{ color: "#8C661F" }}>Passport</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#2A3548",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Writing on business automation, agentic AI, and the craft underneath, by Luke Audie.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
