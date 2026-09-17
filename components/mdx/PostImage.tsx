import { getPublicImageSize } from "@/lib/image-size";
import { MdxImage } from "./MdxImage";

/**
 * Server wrapper for MdxImage: reads the image's intrinsic size from the file
 * in `public/` at build time and passes it as width and height, so the browser
 * reserves the right space before the image loads and the text never shifts.
 * Used for markdown images and Figure; falls back to MdxImage unchanged when
 * the size is unknown (remote URLs, missing files).
 */
export function PostImage(props: React.ComponentProps<typeof MdxImage>) {
  const { src, width, height } = props;
  const size = typeof src === "string" && width == null && height == null ? getPublicImageSize(src) : null;
  return <MdxImage {...props} {...(size ?? {})} />;
}
