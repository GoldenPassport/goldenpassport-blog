import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Intrinsic width and height of an image in `public/`, read from the file
 * header at build time (posts are statically generated). Supports PNG, WebP, JPEG,
 * GIF and SVG (from width/height or the viewBox). Returns null when the file
 * is missing or the format is not recognised, so callers can fall back.
 */
export function getPublicImageSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith("/")) return null;
  let buf: Buffer;
  try {
    buf = readFileSync(path.join(process.cwd(), "public", src));
  } catch {
    return null;
  }

  // PNG: IHDR width and height at bytes 16 to 24.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF: logical screen width and height, little-endian, at bytes 6 to 10.
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // WebP: RIFF container with a VP8X (extended), VP8L (lossless) or VP8
  // (lossy) first chunk.
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    return null;
  }

  // JPEG: walk the markers to the first start-of-frame segment.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
    return null;
  }

  // SVG: explicit width and height, else the viewBox.
  const head = buf.toString("utf8", 0, Math.min(buf.length, 2048));
  const svg = head.match(/<svg\b[^>]*>/i)?.[0];
  if (svg) {
    const w = svg.match(/\bwidth="([\d.]+)(px)?"/)?.[1];
    const h = svg.match(/\bheight="([\d.]+)(px)?"/)?.[1];
    if (w && h) return { width: Math.round(Number(w)), height: Math.round(Number(h)) };
    const vb = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
    if (vb) return { width: Math.round(Number(vb[1])), height: Math.round(Number(vb[2])) };
  }
  return null;
}
