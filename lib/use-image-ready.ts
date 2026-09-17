"use client";

import { useCallback, useState } from "react";

/**
 * Tracks whether an <img> has finished loading its current `src`, so a
 * lightbox can fade the picture in once it is ready instead of letting it
 * draw in piece by piece. Resets automatically when `src` changes (for
 * example previous / next in a gallery).
 *
 *   const img = useImageReady(src);
 *   <img ref={img.attach} src={src} onLoad={img.markReady} onError={img.markReady}
 *        className={img.ready ? "opacity-100" : "opacity-0"} />
 */
export function useImageReady(src: string | undefined) {
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const markReady = useCallback(() => setReadySrc(src ?? null), [src]);
  // A cached image is complete before its load event can be observed.
  const attach = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) setReadySrc(src ?? null);
    },
    [src],
  );
  return { ready: src != null && readySrc === src, attach, markReady };
}

/** Starts fetching an image ahead of time, e.g. when a trigger is hovered. */
export function preloadImage(src: string | undefined) {
  if (!src || typeof window === "undefined") return;
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}
