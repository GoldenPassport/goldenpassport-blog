import { SITE_URL } from "@/lib/site";

const description =
  "The Golden Passport blog reflects Luke Audie's personal opinions and provides general information, not legal or professional advice.";

export const metadata = {
  title: "Disclaimer",
  description,
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  openGraph: { title: "Disclaimer", description, url: `${SITE_URL}/disclaimer` },
  twitter: { title: "Disclaimer", description },
  robots: { index: true, follow: false },
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep">Disclaimer</p>
      <h1 className="mt-4 font-serif text-5xl text-ink">A personal point of view</h1>

      <div className="prose prose-lg max-w-prose font-serif mt-8">
        <p>
          The content on Golden Passport reflects my personal opinions and is provided for general
          information only. It does not represent the views of any employer, client or other
          organisation.
        </p>
        <p>
          Nothing on this site constitutes legal or other professional advice, and it should not
          be relied upon as a substitute for advice about your particular circumstances.
        </p>
        <p>
          Laws, regulations and guidance can change. Before acting on anything discussed here,
          verify the information and seek advice from a suitably qualified professional where
          appropriate.
        </p>
      </div>
    </section>
  );
}
