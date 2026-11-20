import { MANIFESTO, PILLARS, SITE } from "../data/content";
import SectionHeader from "./SectionHeader";
import ScrubText from "./ScrubText";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative px-5 py-28 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader id="about" index="01" file="about.md" title="About" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-10 md:space-y-14 lg:col-span-7">
            {MANIFESTO.map((line) => (
              <ScrubText
                key={line}
                text={line}
                className="font-serif text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.14]"
              />
            ))}
          </div>

          <aside className="space-y-12 lg:col-span-5">
            {/* A little markdown "spec sheet" */}
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-6 font-mono text-[0.82rem] leading-relaxed md:p-8">
                <p className="mb-4 flex gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cobalt" />
                </p>
                <p>
                  <span className="text-pink">##</span> {SITE.name}
                </p>
                <p className="mt-3">
                  <span className="text-pink">-</span> <span className="text-muted">role:</span>{" "}
                  {SITE.role}
                </p>
                <p>
                  <span className="text-pink">-</span> <span className="text-muted">focus:</span>{" "}
                  distributed systems, product engineering, applied AI
                </p>
                <p>
                  <span className="text-pink">-</span> <span className="text-muted">stack:</span>{" "}
                  React · TypeScript · Node · Python · Cloud
                </p>
                <p>
                  <span className="text-pink">-</span> <span className="text-muted">principle:</span>{" "}
                  Ship it. Measure it. Make it simpler.
                </p>
                <p className="mt-4 text-muted">
                  <span className="text-pink">&gt;</span> Build things worth maintaining.
                </p>
              </div>
            </Reveal>

            <ul className="divide-y divide-line border-y border-line">
              {PILLARS.map((p, i) => (
                <li key={p.n}>
                  <Reveal delay={i * 0.08} y={32} className="flex gap-6 py-6">
                    <span className="mono-label pt-2 text-pink">{p.n}</span>
                    <div>
                      <h3 className="font-serif text-3xl">{p.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                        {p.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
