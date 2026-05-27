import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

const withMDX = createMDX({
  options: {
    // Strip YAML frontmatter so it doesn't render as page content.
    // (We still parse it separately in lib/posts.ts via gray-matter to drive
    // the post metadata, listing, tags, canonical link, etc.)
    remarkPlugins: [remarkFrontmatter],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
