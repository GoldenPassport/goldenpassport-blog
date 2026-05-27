import { SITE_URL } from "@/lib/site";

const description =
  "Privacy and cookies policy for the Golden Passport blog. No advertising, no profiling. Privacy-friendly Vercel Analytics, only loaded after you opt in.";

export const metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { title: "Privacy & cookies", description, url: `${SITE_URL}/privacy` },
  twitter: { title: "Privacy & cookies", description },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep">Privacy</p>
      <h1 className="mt-4 font-serif text-5xl text-ink">Privacy & cookies</h1>
      <p className="mt-4 text-sm text-ink-mute">Last updated: 27 May 2026</p>

      <div className="prose prose-lg max-w-prose font-serif mt-8">
        <h2>The short version</h2>
        <p>
          This is a personal blog run by Luke Audie. It collects as little as possible. The only
          analytics in use is Vercel Web Analytics, which is cookieless and does not collect
          personal data, and it is only loaded after you accept the consent banner. There is no
          advertising, no profiling, and no third-party tracker.
        </p>

        <h2>What gets stored</h2>
        <ul>
          <li>
            <strong>Cookie preference.</strong> When you accept or decline the consent banner, the
            choice is saved in your browser’s <em>localStorage</em> under the key{" "}
            <code>gp-cookie-consent</code>. It stays on your device and is never sent to any
            server.
          </li>
          <li>
            <strong>Read history (local only).</strong> When you open a blog post, the slug is added
            to a list in your browser’s <em>localStorage</em> under the key{" "}
            <code>gp:read-posts</code>. It is used purely to display a small "Read" badge on posts
            you have seen, and to stop pinned posts from staying pinned for you once you have read
            them. The data stays on your device and is never sent to any server.
          </li>
          <li>
            <strong>Server logs.</strong> The site is hosted on Vercel. Like any host, Vercel
            keeps short-lived request logs (IP, user agent, URL) for operational and security
            reasons. See Vercel’s privacy notice for details.
          </li>
        </ul>

        <h2>Analytics: Vercel Web Analytics (only with consent)</h2>
        <p>
          If you click <strong>Accept</strong> on the consent banner, the site loads{" "}
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep"
          >
            Vercel Web Analytics
          </a>
          . It is privacy-friendly by design:
        </p>
        <ul>
          <li>
            <strong>No cookies.</strong> Vercel Analytics does not set any cookies on your device.
          </li>
          <li>
            <strong>No personal data.</strong> It does not collect IP addresses, usernames, or any
            identifier that could link a visit to you specifically.
          </li>
          <li>
            <strong>No cross-site tracking.</strong> It does not follow you across the web, and it
            does not share data with any advertising network.
          </li>
          <li>
            <strong>Aggregate page views only.</strong> It records anonymous page-view counts
            (which posts get read, on which day, from which country) so I can see what readers
            actually find useful.
          </li>
        </ul>
        <p>
          If you click <strong>Decline</strong> or do not respond to the consent banner, no
          analytics is loaded at all. The component that loads Vercel Analytics literally renders
          nothing until consent is accepted, and stops loading the moment you revoke it.
        </p>

        <h2>What does not get stored</h2>
        <ul>
          <li>No advertising or marketing cookies are ever set.</li>
          <li>No profile is built about you across sessions or sites.</li>
          <li>No identifiable visitor data is collected, with or without consent.</li>
        </ul>

        <h2>Changing your mind</h2>
        <p>
          To revert your cookie choice, clear this site’s data in your browser settings (delete
          site data / clear cookies and storage for this domain). The consent banner will appear
          again on your next visit.
        </p>

        <h2>Your rights</h2>
        <p>
          Under UK GDPR you have rights of access, rectification, erasure, and objection in
          respect of personal data. Since this site does not collect or hold identifiable personal
          data, there is generally nothing on file to access. If you have a question or concern,
          please get in touch.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy or cookies on this site:{" "}
          <a
            href="mailto:luke.pa@icloud.com"
            className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep"
          >
            luke.pa@icloud.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
