import { BrandStrip } from "@/components/chrome/BrandStrip";

import { SITE_URL } from "@/lib/site";

const description =
  "Luke Audie: fifteen plus years building business automation at IDS Scheer, Software AG, Red Hat and UiPath. From Java developer, to architect, to presales. How the thread leads into agentic AI.";

export const metadata = {
  title: "About",
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Luke Audie",
    description,
    type: "profile",
    url: `${SITE_URL}/about`,
  },
  twitter: { title: "About Luke Audie", description },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs tracking-[0.22em] uppercase text-gold-deep">About</p>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile/profile-photo.jpeg"
          alt="Portrait of Luke Audie"
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-1 ring-gold/40 shadow-sm shrink-0"
        />
        <div className="mt-5 sm:mt-0 flex-1">
          <h1 className="font-serif text-5xl text-ink leading-none">Hi, I’m Luke.</h1>
          <p className="mt-4 font-serif text-2xl leading-snug text-ink-soft">
            I didn’t pivot into agentic AI. I’ve spent fifteen years building toward it, from
            shipping code, to architecting systems, to selling them.
          </p>

          {/* Contact row */}
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <li>
              <a
                href="mailto:luke.pa@icloud.com"
                className="font-semibold text-ink-soft hover:text-gold-deep underline underline-offset-4 decoration-gold/40 hover:decoration-gold-deep"
              >
                luke.pa@icloud.com
              </a>
            </li>
            <li aria-hidden className="text-ink-mute">·</li>
            <li>
              <a
                href="https://www.linkedin.com/in/lukeaudie"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-soft hover:text-gold-deep underline underline-offset-4 decoration-gold/40 hover:decoration-gold-deep"
              >
                LinkedIn
              </a>
            </li>
            <li aria-hidden className="text-ink-mute">·</li>
            <li className="text-ink-mute">United Kingdom</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-prose font-serif mt-8">
        <p>
          UK based. Fifteen plus years in business automation and process architecture, mostly on
          the software vendor side, with stints on the services side too.
        </p>

        {/* ---------- THE SHORT VERSION (skimmer summary) ---------- */}
        <h2>The short version</h2>

        <p>
          I’ve spent my career where the craft gets sharpened: process modelling and architecture
          at IDS Scheer and Software AG, cloud and middleware at Red Hat (acquired by IBM), and
          RPA, process mining and agentic AI at UiPath. Together they cover most of the toolkit
          modern automation actually runs on.
        </p>

        <p>
          Real automation rarely sits in one stack. Most of my work has meant partnering closely
          with the hyperscalers, principally Microsoft Azure and AWS, alongside Google Cloud, IBM
          Cloud and Oracle Cloud where the client estate demanded it.
        </p>

        <p>
          Alongside that, I’ve spent time at leading services firms putting these capabilities to
          work inside real transformation programmes, with banks, telcos and public sector
          organisations across the UK, Europe and Australia.
        </p>

        {/* ---------- VISUAL PROOF: brands + hyperscalers ---------- */}
        <BrandStrip />

        {/* ---------- THE LONGER VERSION (golden-thread narrative) ---------- */}
        <h2>How I got here: three hats, one golden thread (automation at the core)</h2>

        <p>
          Every layer of automation I now work with, I first learned by building it, bringing it
          together, and selling it. In that order. That order matters.
        </p>

        <p>
          <strong>I started as a Java developer, the how.</strong> I built things that ran in
          production: client-customised UIs for the Gartner-leading software from the companies I
          worked for, plus the workflows and underlying integrations I designed and deployed.
          Alongside that I created process-driven solutions including analytics, reporting,
          automated process testing and more. On some builds I ran the whole arc myself and even
          developed new resellable offerings for our sales team, from MVP concept and business
          case, source code and dev work, through to the marketing and sales that took it to
          clients. This is where I saw automation’s inner workings: not the brochure version, but
          how it actually behaves when real data and real users hit it.
        </p>

        <p>
          <strong>Then into architecture, the what and the why.</strong> The people, process and
          technology view. TOGAF, process and data at the centre. Business design workshops,
          whiteboard sessions, strategy and process modelling, blueprinting, SAP process work. I
          designed target architectures, capability models and customer journeys with more than
          twenty clients, consulted across SAP upgrade programmes, and stood up architecture
          competency centres so the capability stuck after I left. Knowing how things are built, I
          could now decide what to build and why, connecting what the business actually needs to
          what the technology can actually do.
        </p>

        <p>
          <strong>Then into presales and technical selling, bringing it all together.</strong>{" "}
          Translating the how, the what and the why into solutions clients would buy and teams
          could deliver. I owned bids end to end, from qualification and demonstrations through to
          proposals and the architecture decisions sitting underneath them. At Red Hat I drove
          cloud and middleware adoption across the big Australian banks, growing strategic-product
          revenue year on year. At UiPath I worked with clients to find automation opportunities
          at scale, including a healthcare programme that freed up hundreds of front-line clinical
          hours in a single month. By here, I could stand in front of business leadership and a
          build team in the same afternoon and be credible to both.
        </p>

        <p>Which brings me to now.</p>

        <p>
          Agentic AI is the next layer of automation, and I didn’t arrive at it as a prompt
          specialist who discovered the field last year. I arrived through fifteen years of
          building, architecting and deploying the automation it sits on top of. I know what’s
          underneath the demo, because I’ve shipped it. I know why a process is shaped the way it
          is, because I’ve modelled it with the people who run it. And I know how to take
          something from concept to client, because I’ve done that arc end to end.
        </p>

        <p>
          What genuinely pulls me in is this: for the first time, the software can reason about
          the process, not just execute it. I spent years mapping how work actually flows, then
          automating it step by painstaking step. Agents change the shape of that problem, and
          having seen the inner workings from every angle, I can’t not build with them. Agentic
          AI isn’t a reinvention for me. It’s where the whole thread has been heading.
        </p>

        {/* ---------- STANDING SECTIONS ---------- */}
        <h2>What I write about</h2>
        <ul>
          <li>
            <strong>Business.</strong> Operating models, where automation actually pays back,
            scoping transformation without burning the team out.
          </li>
          <li>
            <strong>Tech.</strong> Patterns, tools and trade-offs across RPA, agentic AI,
            integration and middleware. Working code where it earns its place.
          </li>
          <li>
            <strong>Shorts.</strong> One-minute reads. A slide as the hero, a few paragraphs of
            argument. The blog equivalent of YouTube Shorts.
          </li>
        </ul>

        <h2>Currently building</h2>
        <p>
          A primary Golden Passport site and a small set of product MVPs, hosted separately. This
          blog is the front door, and a public record of how the thinking evolves.
        </p>

        {/* ---------- REFERENCES ---------- */}
        <div className="not-prose gold-rule mt-16 mb-10" aria-hidden />
        <h2>References</h2>
        <ol className="not-prose mt-4 space-y-3 text-sm text-ink-soft list-decimal pl-5 marker:text-gold-deep">
          <li>
            <strong>BPMN specification (OMG).</strong> Backs the “BPMN contributor” claim on IDS
            Scheer AG.{" "}
            <a
              href="https://www.omg.org/spec/BPMN"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep break-all"
            >
              https://www.omg.org/spec/BPMN
            </a>
          </li>
          <li>
            <strong>webMethods on Wikipedia.</strong> Backs the “home of webMethods” framing on
            Software AG: platform history and acquisition timeline.{" "}
            <a
              href="https://en.wikipedia.org/wiki/WebMethods"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep break-all"
            >
              https://en.wikipedia.org/wiki/WebMethods
            </a>
          </li>
          <li>
            <strong>jBPM project.</strong> Backs the open-source workflow claim on Red Hat.{" "}
            <a
              href="https://www.jbpm.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep break-all"
            >
              https://www.jbpm.org/
            </a>
          </li>
          <li>
            <strong>UiPath, Gartner Magic Quadrant for Robotic Process Automation.</strong> Backs
            the “RPA leader” framing on the UiPath tile.{" "}
            <a
              href="https://www.uipath.com/resources/automation-analyst-reports/gartner-magic-quadrant-robotic-process-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep break-all"
            >
              https://www.uipath.com/resources/automation-analyst-reports/gartner-magic-quadrant-robotic-process-automation
            </a>
          </li>
          <li>
            <strong>UiPath on Wikipedia.</strong> Backs the “helped evangelise RPA and the early
            software robots” framing: company history and product origins.{" "}
            <a
              href="https://en.wikipedia.org/wiki/UiPath"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep underline underline-offset-2 decoration-gold/60 hover:decoration-gold-deep break-all"
            >
              https://en.wikipedia.org/wiki/UiPath
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
