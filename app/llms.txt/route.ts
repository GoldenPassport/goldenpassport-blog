import { getListedPosts } from "@/lib/posts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR } from "@/lib/site";

/**
 * /llms.txt — discovery file for LLM crawlers, following the llms.txt
 * convention (https://llmstxt.org/). Acts like robots.txt or sitemap.xml,
 * but optimised for LLM agents and tools (e.g. Claude Desktop's "Add Site",
 * MCP clients that browse the web, ChatGPT custom GPTs).
 *
 * Structure:
 * - H1 = site name
 * - blockquote = one-line summary
 * - body = optional context
 * - H2 sections = grouped links the LLM can follow
 *
 * Each link is described in one line so the LLM can decide which to fetch.
 * For the full content as a single document, see /llms-full.txt.
 */

export const dynamic = "force-static";

export function GET() {
  const posts = getListedPosts();

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is the personal site of ${AUTHOR.name}, a UK-based business automation consultant. The blog is split into three tracks: **Business** (operating models, where automation pays back, scoping transformation), **Tech** (RPA, agentic AI, BPM, integration, middleware), and **Shorts** (one-minute reads with a slide as the hero, the blog equivalent of YouTube Shorts). Some posts are first published on LinkedIn and republished here with a canonical link back to the original.

For the full text of every post in one document, see [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt). Each individual post is also available as raw markdown at \`/blog/<slug>/raw\`.

## About the author

- [About](${SITE_URL}/about): Background, brands worked at (IDS Scheer, Software AG, Red Hat, UiPath), and the "three hats" journey from developer to architect to presales, leading into agentic AI.
- [Contact](${SITE_URL}/contact): Email and LinkedIn.

## Writing

${posts
  .map(
    (p) =>
      `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt} (Category: ${p.category}; Tags: ${p.tags.join(", ") || "none"}; Published: ${p.date})`,
  )
  .join("\n")}

## Policies

- [Privacy & cookies](${SITE_URL}/privacy): No third-party trackers, no advertising cookies, no profiling.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
