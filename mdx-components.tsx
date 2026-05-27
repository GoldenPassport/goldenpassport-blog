import type { MDXComponents } from "mdx/types";
import { MdxImage } from "@/components/MdxImage";
import { CodeBlock } from "@/components/CodeBlock";

/**
 * Required by @next/mdx in App Router. Exports the components that MDX pages
 * can use. Overrides:
 *
 * - `img`  → MdxImage   (click an image to enlarge it in a lightbox; applies
 *                        to both JSX `<img>` and markdown `![]()` syntax).
 * - `pre`  → CodeBlock  (adds a copy-to-clipboard button to every fenced
 *                        code block).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: MdxImage,
    pre: CodeBlock,
  };
}
