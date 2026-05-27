import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentedAnalytics } from "@/components/ConsentedAnalytics";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  keywords: [
    "business automation",
    "process architecture",
    "agentic AI",
    "RPA",
    "BPM",
    "BOAT",
    "Dynamic Paths",
    "regulated industries",
    "Luke Audie",
    SITE_NAME,
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* MCP / LLM agent discovery (llms.txt convention). Crawlers that
            support the standard find /llms.txt without these hints; the
            tags help generic agents (and `<link rel="alternate">` is the
            cleanest way to advertise an alternate plain-text format). */}
        <link rel="alternate" type="text/plain" title="LLM-friendly index" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLM-friendly full content" href="/llms-full.txt" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip link: visually hidden until focused, lets keyboard users jump
            past the header nav. WCAG 2.4.1 (Bypass Blocks). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-gold-deep focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <ConsentedAnalytics />
      </body>
    </html>
  );
}
