import { SITE_URL } from "@/lib/site";

const description =
  "Privacy and cookies policy for the Golden Passport blog. No third-party trackers, no advertising cookies, no profiling. Just the consent preference and standard hosting logs.";

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
      <p className="mt-4 text-sm text-ink-mute">Last updated: 26 May 2026</p>

      <div className="prose prose-lg max-w-prose font-serif mt-8">
        <h2>The short version</h2>
        <p>
          This is a personal blog run by Luke Audie. It collects as little as possible. There are
          no third-party trackers, no advertising cookies, and no profiling. If that ever changes,
          this page will say so before anything is enabled.
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

        <h2>What does not get stored</h2>
        <ul>
          <li>No analytics or tracking cookies are set today.</li>
          <li>No advertising or marketing cookies are set, ever.</li>
          <li>No profile is built about you across sessions or sites.</li>
        </ul>

        <h2>If analytics is added later</h2>
        <p>
          If a privacy-respecting analytics tool is ever added (for example, a self-hosted Plausible
          or Vercel Web Analytics), it will only be loaded after you have accepted the consent
          banner. The default state is no tracking.
        </p>

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
