/**
 * One-off generator for the Golden Passport social avatar PNGs.
 *
 * Takes the brand mark path (same as app/icon.svg) and renders it onto a
 * cream square at two sizes: 1024 (the master) and 512 (downscaled). Both
 * land in public/brand/. GitHub, LinkedIn, X etc. crop avatars to a circle,
 * so the mark sits comfortably centred with generous breathing room.
 *
 * Run:
 *   pnpm dlx node scripts/gen-social-avatars.mjs
 * (or simply `node scripts/gen-social-avatars.mjs` once sharp is hoisted).
 */
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
// sharp lives inside pnpm's store; resolve it explicitly so this script
// works whether or not sharp is hoisted to the project node_modules root.
const sharp = require(
  path.resolve(
    "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp",
  ),
);

const MARK_PATH =
  "M 179.5 22.443 C 23.377 55.259, -49.729 351.5, 88.5 391.194 C 142.397 406.671, 229.175 372.892, 371.904 280.876 C 381.918 274.42, 384.535 273.132, 385.488 274.19 C 482.518 381.897, 515.361 401.598, 583.624 393.041 C 671.647 382.006, 747.782 278.752, 744.727 174.556 C 741.911 78.54, 651.14 73.899, 498.5 161.968 C 462.181 182.923, 445.855 192.866, 406.101 218.239 C 397.632 223.645, 390.344 227.94, 389.906 227.784 C 389.469 227.628, 385.198 223.225, 380.416 218 C 320.449 152.478, 262.07 106.646, 221.282 93.07 C 209.752 89.232, 209.568 89.361, 202.428 106.275 C 195.084 123.674, 194.896 122.854, 207.166 126.95 C 248.347 140.7, 302.114 181.587, 352.839 237.729 C 361.178 246.958, 361.178 246.958, 346.839 256.327 C 118.773 405.356, 34.789 392.64, 93.701 218 C 130.905 107.711, 195.627 47.129, 248.5 73.102 C 253.834 75.723, 257.295 78.112, 272.132 89.413 C 278.545 94.298, 304.842 68.166, 299.683 62.035 C 272.198 29.371, 223.251 13.247, 179.5 22.443 M 656.5 135.594 C 607.444 142.435, 527.008 180.684, 421.751 247.221 C 411.8 253.511, 410.51 250.777, 436.509 278.5 C 443.214 285.65, 450.23 293.264, 452.1 295.42 C 527.288 382.109, 603.908 361.997, 669.122 238.455 C 705.956 168.674, 701.133 129.369, 656.5 135.594";

const CREAM = "#FBF7EF";
const GOLD = "#B8893B";

/**
 * Build a cream-square SVG with the brand mark centred and scaled so the
 * mark occupies ~70% of the canvas width (leaves a comfortable safe zone
 * for circular crops).
 */
function buildSvg(size) {
  // Mark native dimensions:  758 × 403  (from the original viewBox).
  const targetMarkWidth = size * 0.7;
  const scale = targetMarkWidth / 758;
  const tx = (size - 758 * scale) / 2;
  const ty = (size - 403 * scale) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${CREAM}"/>
  <g transform="translate(${tx} ${ty}) scale(${scale})">
    <path fill="${GOLD}" fill-rule="evenodd" d="${MARK_PATH}"/>
  </g>
</svg>`;
}

const outDir = "public/brand";
await fs.mkdir(outDir, { recursive: true });

for (const size of [512, 1024]) {
  const svg = buildSvg(size);
  const outPath = `${outDir}/social-avatar-${size}.png`;
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  const stat = await fs.stat(outPath);
  console.log(`✓ ${outPath}  (${(stat.size / 1024).toFixed(1)} KB)`);
}

console.log("done.");
