/**
 * Image + caption figure, the standard captioned-graphic block used across
 * posts. Wraps MdxImage in the `not-prose` figure shell so an MDX file writes
 * one line instead of the six-line <figure>/<MdxImage>/<figcaption> boilerplate:
 *
 *   <Figure
 *     src="/posts/<slug>/diagram.svg"
 *     alt="Describe the graphic for screen readers."
 *     caption="Short italic caption shown under the image."
 *   />
 *
 * `caption` is optional. `className` overrides the default image styling
 * (full width, rounded, thin gold ring). Registered in `mdx-components.tsx`
 * and the post page's components map.
 */
import { MdxImage } from "./MdxImage";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function Figure({ src, alt, caption, className }: Props) {
  return (
    <figure className="not-prose my-8">
      <MdxImage
        src={src}
        alt={alt}
        className={className ?? "w-full h-auto rounded-lg ring-1 ring-gold/10"}
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-ink-mute italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
