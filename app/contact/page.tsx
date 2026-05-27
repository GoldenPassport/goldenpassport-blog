import { SITE_URL } from "@/lib/site";

const description =
  "Get in touch with Luke Audie about business automation, agentic AI, presales advisory, or consulting engagements. Email and LinkedIn.";

export const metadata = {
  title: "Contact",
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { title: "Contact Luke Audie", description, url: `${SITE_URL}/contact` },
  twitter: { title: "Contact Luke Audie", description },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-16 pb-20">
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep">Contact</p>
      <h1 className="mt-4 font-serif text-5xl text-ink">Let’s talk.</h1>
      <p className="mt-5 text-lg text-ink-soft max-w-prose">
        Working on an automation problem, considering a project, or just want to compare notes?
        The fastest way to reach me is email or LinkedIn.
      </p>

      <div className="mt-10 space-y-4">
        <ContactRow label="Email" value="luke.pa@icloud.com" href="mailto:luke.pa@icloud.com" />
        <ContactRow
          label="LinkedIn"
          value="linkedin.com/in/lukeaudie"
          href="https://www.linkedin.com/in/lukeaudie"
        />
      </div>

      <div className="gold-rule mt-12" />
      <p className="mt-6 text-sm text-ink-mute">
        Based remote · Available for consulting, advisory, and select build engagements.
      </p>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-baseline justify-between border-b border-gold/20 py-4 group"
    >
      <span className="text-xs tracking-[0.18em] uppercase text-ink-mute">{label}</span>
      <span className="font-serif text-xl text-ink group-hover:text-gold-deep transition-colors">
        {value} →
      </span>
    </a>
  );
}
