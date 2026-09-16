#!/usr/bin/env node
/**
 * Convert post PNGs to lossless WebP and point the posts at the WebP files.
 *
 *   pnpm images:webp                                   # convert and update posts
 *   pnpm images:webp --dry                             # report only
 *
 * - Lossless: every pixel matches the PNG, so small text in screenshots stays
 *   exactly as sharp. Resolution is unchanged.
 * - Writes <name>.webp next to each <name>.png under public/posts and leaves
 *   the PNG in place (delete the originals separately once happy).
 * - Skips a file when the WebP would not be smaller, and never touches
 *   og.png or any path used as `ogImage`, since link unfurlers expect PNG/JPEG.
 * - Rewrites references in content/posts/*.mdx from .png to .webp only for
 *   files that were converted. Safe to run again: existing WebP files are
 *   reused and already-updated references are left alone.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// sharp is a Next.js dependency inside pnpm's store; resolve it through Next
// so the script keeps working when either package is upgraded.
function loadSharp() {
  try {
    return require("sharp");
  } catch {
    return createRequire(require.resolve("next/package.json"))("sharp");
  }
}
const sharp = loadSharp();

const PUBLIC_POSTS = path.join(ROOT, "public", "posts");
const CONTENT = path.join(ROOT, "content", "posts");
const DRY = process.argv.includes("--dry");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}

const posts = readdirSync(CONTENT).filter((f) => f.endsWith(".mdx")).map((f) => path.join(CONTENT, f));
const ogImages = new Set(
  posts.flatMap((p) => [...readFileSync(p, "utf8").matchAll(/^ogImage:\s*"([^"]+)"/gm)].map((m) => m[1])),
);

let before = 0;
let after = 0;
const converted = new Map(); // "/posts/x/y.png" -> "/posts/x/y.webp"

for (const file of walk(PUBLIC_POSTS).filter((f) => f.toLowerCase().endsWith(".png"))) {
  const url = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  if (path.basename(file) === "og.png" || ogImages.has(url)) {
    console.log(`skip (social image)  ${url}`);
    continue;
  }
  const out = file.replace(/\.png$/i, ".webp");
  const pngSize = statSync(file).size;
  let webpSize;
  if (existsSync(out)) {
    webpSize = statSync(out).size;
  } else {
    const buf = await sharp(file).webp({ lossless: true, effort: 6 }).toBuffer();
    webpSize = buf.length;
    if (webpSize < pngSize && !DRY) writeFileSync(out, buf);
  }
  if (webpSize >= pngSize) {
    console.log(`skip (not smaller)   ${url}`);
    continue;
  }
  before += pngSize;
  after += webpSize;
  converted.set(url, url.replace(/\.png$/i, ".webp"));
  console.log(`${String(Math.round(pngSize / 1024)).padStart(5)}K -> ${String(Math.round(webpSize / 1024)).padStart(5)}K  ${url}`);
}

let refs = 0;
for (const p of posts) {
  let s = readFileSync(p, "utf8");
  let n = 0;
  for (const [from, to] of converted) {
    const parts = s.split(from);
    if (parts.length > 1) {
      n += parts.length - 1;
      s = parts.join(to);
    }
  }
  if (n) {
    refs += n;
    if (!DRY) writeFileSync(p, s);
    console.log(`updated ${n} reference(s) in ${path.relative(ROOT, p)}`);
  }
}

const kb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;
console.log(
  `\n${converted.size} images: ${kb(before)} -> ${kb(after)} (${before ? Math.round((1 - after / before) * 100) : 0}% smaller), ${refs} references ${DRY ? "would be " : ""}updated.`,
);
