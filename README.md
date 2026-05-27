# Golden Passport Blog

Personal blog for Luke Audie / Golden Passport. Next.js 15 (App Router) + MDX + Tailwind, deployed on Vercel.

## Local dev

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Writing posts

Add an `.mdx` file under `content/posts/`. The filename becomes the slug, so `my-post.mdx` is served at `/blog/my-post`.

### Frontmatter

```yaml
---
title: "Post title"
date: "2026-05-26"                          # ISO date
category: "Business"                        # "Business", "Tech", or "Shorts"
excerpt: "One-sentence summary shown on the index and at the top of the post."
tags:                                       # optional; freeform sub-topics
  - Automation
  - RPA
  - Strategy
canonical: "https://example.com/original"   # optional; use when republishing
hero: "/posts/my-slug/hero.png"             # optional; main image at the top
heroAlt: "Descriptive alt text"             # optional; falls back to title
pinned: true                                # optional; sorts ahead of dated posts
unlisted: true                              # optional; URL works, hidden from lists
draft: true                                 # optional; route 404s, file kept
---
```

**Categories.** `Business` (operating models, where automation pays back),
`Tech` (long-form patterns and build write-ups), and `Shorts` (one-minute
reads with a slide-style hero).

**`canonical`.** When set, the post page emits `<link rel="canonical">` pointing
at the original source so Google attributes the content there rather than
treating the blog copy as duplicate. Use it for posts first published on
LinkedIn, Medium, etc.

**`hero` / `heroAlt`.** When set, the image renders at the top of the post
and is used as the `og:image` / Twitter card image / JSON-LD `image`. Keep
hero images under `public/posts/<slug>/`. All in-body images get a
click-to-enlarge lightbox automatically via the `MdxImage` component.

**`pinned`.** Pinned posts sort ahead of all non-pinned posts everywhere
they're listed (home recents, blog index, llms.txt). A "Pinned" badge
renders on the post card so it's visually distinct.

### Publish / archive states

| Frontmatter | URL works? | Listed? | In sitemap / llms.txt? | Indexed by Google? |
|---|---|---|---|---|
| (default) | ✓ | ✓ | ✓ | ✓ |
| `unlisted: true` | ✓ | ✗ | ✗ | ✗ (emits noindex) |
| `draft: true` | ✗ (404) | ✗ | ✗ | n/a |

- Use **`unlisted`** when you want to keep the URL alive (e.g. share-by-link, retired piece) but stop surfacing it in any list. The post page renders an "Unlisted" badge at the top so you know.
- Use **`draft`** when the post isn't ready for any audience but you want to keep working on it in-repo.

## Brand tokens

Tailwind theme is the source of truth; see `tailwind.config.ts`. When the
rest of the Golden Passport surfaces come online, extract `theme.extend` and
`app/globals.css` into a shared package.

The brand mark and wordmark live in `components/Brand.tsx`. Several preset
sizes are exported (`BrandXs`, `BrandSm`, `BrandMd`, `BrandLg`, `BrandHero`)
plus a `BrandResponsive` that adapts mark + wordmark size by viewport.

## Deploying

Push to the connected GitHub repo; Vercel builds on every push to `main`.

### Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical site origin. In production this is `https://goldenpassport.blog`. Used by every page's metadata, the sitemap, the robots policy, the JSON-LD, and all canonical / og:image / og:url tags. Without this, everything resolves against `http://localhost:3000`. Set it on Vercel under Project Settings → Environment Variables → Production. |

A `.env.example` template at the repo root shows the expected shape.

## SEO

The site emits:

- Per-page `<title>`, `description`, `og:*`, `twitter:*`, and canonical tags for **every** route (home, about, contact, privacy, blog index, each blog post).
- A dynamic site-wide Open Graph card at `/opengraph-image` (1200×630 PNG, brand-styled). Blog posts override this with their `hero` image when present.
- `/sitemap.xml` — auto-generated from the page list and the MDX posts.
- `/robots.txt` — points crawlers at the sitemap.
- JSON-LD: `Person` schema on the home page, `Article` schema on each post (with author, publisher, dates, tags, hero image, and `isBasedOn` when republished from LinkedIn).
- Republished posts also emit `<link rel="canonical">` pointing at the original source so Google attributes content to its first publication.

## MCP / LLM agent friendliness

The site is set up so LLM agents, MCP clients, and Claude Desktop's "Add Site" feature can ingest content cleanly:

| Endpoint | What it serves |
|---|---|
| `/llms.txt` | Discovery file ([llms.txt convention](https://llmstxt.org/)). Site summary plus a one-line entry for every post with title, excerpt, category, tags, and URL. |
| `/llms-full.txt` | All posts concatenated into a single plaintext document. Use this when you want to load the whole site into an LLM context in one fetch. |
| `/blog/<slug>/raw` | The raw MDX of a single post (with frontmatter intact) at `text/markdown` Content-Type. Skips the React / Tailwind shell. |

These endpoints are auto-generated from the same MDX content that drives the public site, so they stay in sync without any extra maintenance. Drafts are excluded everywhere; unlisted posts are excluded from the index endpoints but their raw URL still works.

The site root also advertises the two `llms*.txt` files via `<link rel="alternate" type="text/plain">` tags so generic LLM-aware tooling can discover them automatically.

## Storybook

Component-level dev surface for everything in `components/`. Useful for
iterating on a card, badge, or layout without spinning up the full Next.js
app, and for hand-off / review of design choices.

```bash
pnpm storybook         # dev server at http://localhost:6006
pnpm build-storybook   # static build into ./storybook-static
```

- Stories are co-located with their components (`components/Foo.stories.tsx`).
- The same Tailwind theme and brand fonts as the live site are loaded into
  the preview (`.storybook/preview.tsx`).
- Accessibility checks via `@storybook/addon-a11y` run on every story; flip
  `a11y.test` in the preview from `"todo"` to `"error"` to fail CI on AA
  violations.

## Licence and content

This repository is dual-licensed:

- **Code** (TypeScript, configs, components, etc.) is released under the [MIT licence](./LICENSE).
- **Prose content** (everything under `content/posts/`, all `app/**/page.tsx` body copy, images under `public/`) is © Luke Audie. All rights reserved. Don't republish without permission. Quoting with attribution is welcome.
