import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Strip YAML frontmatter so it doesn't render as page content.
      // (We still parse it separately in lib/posts.ts via gray-matter to drive
      // the post metadata, listing, tags, canonical link, etc.)
      remarkFrontmatter,
      // GitHub-Flavored Markdown: enables pipe-tables, task lists,
      // strikethrough, autolinks, and footnotes inside MDX.
      remarkGfm,
    ],
    rehypePlugins: [
      // Auto-assign id="..." to every heading based on its text. The
      // PostToc component reads those ids client-side to build the
      // stepper menu and to scroll on click.
      rehypeSlug,
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Ensure the OG-card font (read via fs at runtime) is bundled into the
  // serverless function for the blog post route on Vercel.
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./public/fonts/CormorantGaramond-600.woff"],
    "/blog/[slug]/opengraph-image/[__metadata_id__]": [
      "./public/fonts/CormorantGaramond-600.woff",
    ],
  },
};

export default withMDX(nextConfig);
