import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryBadge, PinnedBadge, ReadIndicator, Tag, TagList, PostCard } from "./PostCard";
import type { PostMeta } from "@/lib/posts";

// ──────────────────────────────────────────────────────────────────────────
// Category badge
// ──────────────────────────────────────────────────────────────────────────

const categoryMeta: Meta<typeof CategoryBadge> = {
  title: "Post / CategoryBadge",
  component: CategoryBadge,
  parameters: { layout: "centered" },
  argTypes: {
    category: { control: "radio", options: ["Business", "Tech", "Shorts"] },
  },
};
export default categoryMeta;

type CategoryStory = StoryObj<typeof CategoryBadge>;

export const Business: CategoryStory = { args: { category: "Business" } };
export const Tech: CategoryStory = { args: { category: "Tech" } };
export const Shorts: CategoryStory = { args: { category: "Shorts" } };

export const AllCategoriesSideBySide: CategoryStory = {
  render: () => (
    <div className="flex items-center gap-3">
      <CategoryBadge category="Business" />
      <CategoryBadge category="Tech" />
      <CategoryBadge category="Shorts" />
    </div>
  ),
};

// ──────────────────────────────────────────────────────────────────────────
// Status badges
// ──────────────────────────────────────────────────────────────────────────

export const StatusMarkers: StoryObj = {
  name: "Status markers (Pinned badge + Read indicator)",
  render: () => (
    <div className="flex items-center gap-4">
      <PinnedBadge />
      <ReadIndicator />
    </div>
  ),
};

// ──────────────────────────────────────────────────────────────────────────
// Tag + TagList (with and without truncation)
// ──────────────────────────────────────────────────────────────────────────

export const SingleTag: StoryObj = {
  name: "Tag (single chip)",
  render: () => <Tag>Agentic AI</Tag>,
};

const sampleTags = [
  "Agentic AI",
  "Camunda",
  "ChatGPT",
  "RAG",
  "BPM",
  "Process Automation",
  "InsuranceTech",
  "Open Source",
];

export const TagListFull: StoryObj = {
  name: "TagList (no truncation, all visible)",
  render: () => <TagList tags={sampleTags} />,
};

export const TagListTruncated: StoryObj = {
  name: "TagList (truncated to 2, click +N more to expand)",
  render: () => <TagList tags={sampleTags} truncate />,
};

export const TagListLinkable: StoryObj = {
  name: "TagList (clickable chips → /blog?tag=…)",
  render: () => <TagList tags={sampleTags.slice(0, 4)} linkable />,
};

// ──────────────────────────────────────────────────────────────────────────
// Full PostCard in its various states
// ──────────────────────────────────────────────────────────────────────────

const basePost: PostMeta = {
  slug: "example-post",
  title: "How to Safely Create Meaningful AI Automation in Regulated Industries",
  date: "2025-11-10",
  category: "Tech",
  excerpt:
    "A practical method for adopting Agentic AI in regulated industries: Dynamic Paths, deterministic outcomes, and governance that scales.",
  tags: sampleTags,
  readingTime: "9 min read",
};

const cardMeta: Meta<typeof PostCard> = {
  title: "Post / Card",
  component: PostCard,
  parameters: { layout: "padded" },
};

export const Card: StoryObj<typeof PostCard> = {
  ...cardMeta,
  name: "Default (Tech, many tags, truncated)",
  render: () => (
    <div className="max-w-3xl">
      <PostCard post={basePost} />
    </div>
  ),
};

export const CardBusinessPinned: StoryObj = {
  name: "Card (Business, pinned, unread)",
  render: () => (
    <div className="max-w-3xl">
      <PostCard
        post={{
          ...basePost,
          slug: "welcome",
          title: "Welcome to Golden Passport",
          category: "Business",
          excerpt:
            "Why I’m starting a blog about automation, and how the Business and Tech tracks fit together.",
          tags: ["Strategy", "Brand", "Automation"],
          pinned: true,
          date: "2026-05-26",
          readingTime: "2 min read",
        }}
      />
    </div>
  ),
};

export const CardRead: StoryObj = {
  name: "Card (read — shows Read badge, hides Pinned)",
  render: () => (
    <div className="max-w-3xl">
      <PostCard
        post={{ ...basePost, pinned: true, slug: "read-example" }}
        read
      />
    </div>
  ),
};

export const CardShorts: StoryObj = {
  name: "Card (Shorts category)",
  render: () => (
    <div className="max-w-3xl">
      <PostCard
        post={{
          ...basePost,
          slug: "short",
          title: "Customer Experience Isn’t a Technology Problem",
          category: "Shorts",
          excerpt:
            "The road to true 1:1 customer experience is not about better tools, more data, or smarter AI.",
          tags: ["Customer Experience", "Personalisation", "Operating Model"],
          date: "2026-05-05",
          readingTime: "1 min read",
        }}
      />
    </div>
  ),
};
