import { getAllPosts, getGroupSiblings } from "@/lib/posts";
import { PostHeader, type PostHeaderData } from "@/components/blog/PostHeader";

/**
 * Shared by the blog index and every post. Posts get their back link and tabs
 * from here, so switching between the tabs of a group does not remount them.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts: PostHeaderData = Object.fromEntries(
    getAllPosts().map((p) => [
      p.slug,
      {
        unlisted: Boolean(p.unlisted),
        comingSoon: Boolean(p.comingSoon),
        tabs: getGroupSiblings(p.group).map((s) => ({
          slug: s.slug,
          label: s.groupLabel || s.title,
          comingSoon: Boolean(s.comingSoon),
        })),
      },
    ]),
  );

  // One element around the header and the page: the page transition in
  // app/layout.tsx pairs the old and new page by their top-level elements, so
  // two siblings here would pair the blog index with the post header alone.
  return (
    <div>
      <PostHeader posts={posts} />
      {children}
    </div>
  );
}
