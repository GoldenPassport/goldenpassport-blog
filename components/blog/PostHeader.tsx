"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PostTabs, type PostTab } from "@/components/blog/PostTabs";

export type PostHeaderData = Record<
  string,
  { unlisted: boolean; comingSoon: boolean; tabs: PostTab[] }
>;

/**
 * The top of every post: the back link, the Unlisted note and, for posts in a
 * group, the Article / Demo tabs.
 *
 * It lives in the blog layout rather than the post page, so moving between
 * tabs keeps this in place and only the post below it changes. The current
 * post comes from the URL; the layout passes the small per-post map it needs.
 */
export function PostHeader({ posts }: { posts: PostHeaderData }) {
  const pathname = usePathname();
  const slug = pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const post = slug ? posts[slug] : undefined;
  if (!slug || !post) return null;

  return (
    // The inner element is named for the page transition, like the site
    // header, so the fade between posts (app/layout.tsx) leaves it still. The
    // outer wrapper matters: React names the direct children of its
    // ViewTransition during a transition, which would override this name.
    <div>
    <div className="mx-auto max-w-5xl px-6 pt-16" style={{ viewTransitionName: "post-header" }}>
      <Link href="/blog" className="text-sm text-ink-mute hover:text-gold-deep">
        ← All writing
      </Link>

      {/* A coming-soon page is unlisted too, but readers reach it from its
          tab, so it does not need the Unlisted note. */}
      {post.unlisted && !post.comingSoon ? (
        <div
          role="note"
          className="ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/5 border border-ink/15 text-xs tracking-[0.18em] uppercase text-ink-soft"
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
          Unlisted
        </div>
      ) : null}

      {post.tabs.length > 1 ? (
        <div className="mt-6">
          <PostTabs siblings={post.tabs} currentSlug={slug} />
        </div>
      ) : null}
    </div>
    </div>
  );
}
