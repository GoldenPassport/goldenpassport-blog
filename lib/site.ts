/**
 * Site-wide constants used by SEO metadata, sitemap, robots, JSON-LD, etc.
 *
 * `NEXT_PUBLIC_SITE_URL` should be set on Vercel to the live origin
 * (https://goldenpassport.blog in production). The fallback is dev-only
 * and produces correct localhost URLs while building.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const SITE_NAME = "Golden Passport";

export const SITE_TITLE = "Luke · Golden Passport";

export const SITE_DESCRIPTION =
  "Luke Audie. Fifteen plus years in business automation and process architecture, built at IDS Scheer, Software AG, Red Hat and UiPath. Writing on automation, operations, and the tools that make modern businesses run.";

export const AUTHOR = {
  name: "Luke Audie",
  url: SITE_URL,
  email: "luke.pa@icloud.com",
  linkedin: "https://www.linkedin.com/in/lukeaudie",
};
