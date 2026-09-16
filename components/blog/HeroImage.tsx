"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { MdxImage } from "@/components/mdx/MdxImage";

/**
 * Post hero. The frame holds the image's proportions from the first paint, so
 * the title below never jumps, and shows a soft shimmer until the image has
 * loaded, when the image fades in over it.
 *
 * Raster heroes go through next/image, which serves a WebP or AVIF sized to
 * the screen. SVG and GIF are served as they are (next/image does not
 * optimise vector or animated images). Clicking still opens the lightbox.
 */
export function HeroImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [loaded, setLoaded] = useState(false);
  // A cached image can finish loading before hydration, so its load event
  // is missed; check completion when the element mounts as well.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);
  const passThrough = /\.(svg|gif)$/i.test(src);

  return (
    <MdxImage src={src} alt={alt}>
      <span
        className="relative block w-full overflow-hidden bg-cream-200 shadow-sm ring-1 ring-gold/10 sm:rounded-xl"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span
          aria-hidden="true"
          className={`hero-shimmer absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          preload
          loading="eager"
          fetchPriority="high"
          unoptimized={passThrough}
          sizes="(min-width: 1280px) 736px, (min-width: 1024px) 976px, 100vw"
          ref={imgRef}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`relative block h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </span>
    </MdxImage>
  );
}
