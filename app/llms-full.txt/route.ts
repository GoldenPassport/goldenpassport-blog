import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getListedPosts } from "@/lib/posts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR } from "@/lib/site";

/**
 * /llms-full.txt — the entire site rendered as a single plaintext / markdown
 * document so an LLM can ingest it in one fetch. Bigger than /llms.txt;
 * intended for retrieval, embedding, or "load the whole site into context"
 * workflows.
 *
 * Each post's MDX is included as-is (frontmatter stripped, JSX-wrappers and
 * other inline HTML left alone — LLMs read them fine as markdown).
 */

export const dynamic = "force-static";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostBody(slug: string): string {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return "";
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  return content.trim();
}

export function GET() {
  const posts = getListedPosts();

  const header = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Author: ${AUTHOR.name} (${AUTHOR.linkedin})
Site: ${SITE_URL}
Generated: ${new Date().toISOString()}

This document contains the full text of every published post on ${SITE_NAME}, in reverse-chronological order. Frontmatter has been stripped; the rest of each post is included verbatim. Republished posts are marked with their canonical source URL.

---
`;

  const sections = posts.map((p) => {
    const body = readPostBody(p.slug);
    const canonicalLine = p.canonical
      ? `Originally published at: ${p.canonical}\n`
      : "";
    return `

# ${p.title}

URL: ${SITE_URL}/blog/${p.slug}
Date: ${p.date}
Category: ${p.category}
Tags: ${p.tags.join(", ") || "(none)"}
${canonicalLine}
${p.excerpt ? `\n> ${p.excerpt}\n` : ""}
${body}

---`;
  });

  return new Response(header + sections.join(""), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
