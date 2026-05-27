"use client";

import { useMemo } from "react";
import type { PostMeta } from "@/lib/posts";
import { useReadPosts } from "@/lib/read-posts";
import { PostCard } from "./PostCard";

/**
 * Client-side wrapper around the post list. Responsibilities:
 *
 *  1. Read localStorage for which posts the visitor has already read.
 *  2. Pass that `read` flag down into each `PostCard` so the card can
 *     render the "Read" badge and suppress its "Pinned" badge.
 *  3. Re-sort: a pinned post the visitor has already read is demoted to
 *     its natural date-position. The intent of pinning is "show this
 *     first," so once it has been shown and read, the pin has done its
 *     job and the post drops back into the chronological feed.
 *
 * On first server render, `useReadPosts()` returns an empty Set, so the
 * sort matches the SSR order (pinned-first by date desc, identical to
 * `getListedPosts()`). After hydration, the effect populates from
 * localStorage and the list re-renders. A brief reflow is possible when
 * a previously-read pinned post slides down to its date position.
 */
export function PostList({ posts, limit }: { posts: PostMeta[]; limit?: number }) {
  const readSet = useReadPosts();

  const sorted = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aPinned = !!a.pinned && !readSet.has(a.slug);
      const bPinned = !!b.pinned && !readSet.has(b.slug);
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
      return a.date < b.date ? 1 : -1;
    });
  }, [posts, readSet]);

  const visible = limit ? sorted.slice(0, limit) : sorted;

  return (
    <>
      {visible.map((p) => (
        <PostCard key={p.slug} post={p} read={readSet.has(p.slug)} />
      ))}
    </>
  );
}
