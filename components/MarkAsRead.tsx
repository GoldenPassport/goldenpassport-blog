"use client";

import { useEffect } from "react";
import { markRead } from "@/lib/read-posts";

/**
 * Renders nothing. Marks the current post as read in localStorage when
 * mounted. Drop into any post page like:
 *
 *   <MarkAsRead slug={post.slug} />
 *
 * Idempotent: calling markRead with a slug already in the set is a no-op.
 */
export function MarkAsRead({ slug }: { slug: string }) {
  useEffect(() => {
    markRead(slug);
  }, [slug]);
  return null;
}
