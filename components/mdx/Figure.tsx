/**
 * Image + caption figure, the standard captioned-graphic block used across
 * posts. Wraps MdxImage in the `not-prose` figure shell so an MDX file writes
 * one component instead of the six-line <figure>/<MdxImage>/<figcaption>
 * boilerplate.
 *
 *   Simple caption:
 *     <Figure src="/posts/<slug>/x.svg" alt="..." caption="Short caption." />
 *
 *   Rich caption (links, `code`, emphasis) via MDX children:
 *     <Figure src="/posts/<slug>/x.png" alt="...">
 *     Caption with a [link](https://example.com) or `code`.
 *     </Figure>
 *
 *   With a download link (rendered to the right of the caption):
 *     <Figure src="/posts/<slug>/x.svg" alt="..." caption="Anti-pattern 1: ..."
 *       download="/posts/<slug>/x.bpmn" downloadLabel="Download BPMN" />
 *
 * `className` overrides the default image styling (full width, rounded, thin
 * gold ring). Registered in `mdx-components.tsx` and the post page's map.
 */
import { MdxImage } from "./MdxImage";

type Props = {
  src: string;
  alt: string;
  /** Caption as a plain string. Use `children` instead for links / code. */
  caption?: React.ReactNode;
  /** Rich caption authored as MDX markdown. Takes precedence over `caption`. */
  children?: React.ReactNode;
  className?: string;
  /** href for a download link shown to the right of the caption. */
  download?: string;
  /** Label for the download link. Defaults to "Download". */
  downloadLabel?: string;
};

export function Figure({
  src,
  alt,
  caption,
  children,
  className,
  download,
  downloadLabel = "Download",
}: Props) {
  const cap = children ?? caption;
  return (
    <figure className="not-prose my-8">
      <MdxImage
        src={src}
        alt={alt}
        className={className ?? "w-full h-auto rounded-lg ring-1 ring-gold/10"}
      />
      {download ? (
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-mute italic">
          <span className="min-w-0 flex-1">{cap}</span>
          <a
            href={download}
            download
            className="shrink-0 not-italic text-gold-deep underline underline-offset-2"
          >
            {downloadLabel}
          </a>
        </figcaption>
      ) : cap ? (
        <figcaption className="mt-3 text-center text-sm text-ink-mute italic [&>p]:m-0 [&_a]:text-gold-deep [&_a]:underline [&_a]:underline-offset-2">
          {cap}
        </figcaption>
      ) : null}
    </figure>
  );
}
