import type { Metadata } from "next";
import ReactDOM from "react-dom";
import "./globals.css";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
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
  // Preload the above-the-fold fonts so they are ready at first paint. Without
  // this they load after the CSS and swap in a few seconds later (font-display:
  // swap), which reflows the page and, on Safari, drops the author cursor on
  // links after the repaint. Inter-italic is rarely above the fold, so it is
  // left to load on demand. Using react-dom's preload emits a single, deduped
  // <link> (a raw <link> in <head> gets duplicated by React's resource system).
  const fontPreload = { as: "font", type: "font/woff2", crossOrigin: "anonymous" } as const;
  ReactDOM.preload("/fonts/cormorant-garamond-variable.woff2", fontPreload);
  ReactDOM.preload("/fonts/cormorant-garamond-italic-variable.woff2", fontPreload);
  ReactDOM.preload("/fonts/inter-variable.woff2", fontPreload);

  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <head>
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
