import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllPosts, getPostSlugs } from "@/lib/posts";

/**
 * /blog/<slug>/raw — returns the raw MDX of a single post as text/plain.
 *
 * Useful for LLM agents that want clean source content without parsing the
 * site's HTML / Tailwind / React shell. Frontmatter is preserved at the top
 * so machine readers get the metadata too.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  // Drafts (filtered out of getAllPosts) shouldn't expose their raw markdown,
  // even though the .mdx file still exists on disk.
  if (!getAllPosts().some((p) => p.slug === slug)) {
    return new Response("Not found", { status: 404 });
  }
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf8");
  // Read but discard via gray-matter so we get a clean, normalised string.
  // (Frontmatter stays in the response body; LLMs benefit from the metadata.)
  matter(raw);

  return new Response(raw, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
