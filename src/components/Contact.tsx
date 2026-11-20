import { useEffect, useRef, useState } from "react";
import { SITE, SOCIALS } from "../data/content";
import SectionHeader from "./SectionHeader";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative px-5 py-28 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader id="contact" index="05" file="contact.md" title="Contact" />

        <p className="font-serif text-[clamp(2.4rem,6.5vw,6rem)] leading-[1]">
          <SplitReveal text="Let's build something" scroll className="block" />
          <SplitReveal text="that lasts." scroll delay={0.15} className="block italic text-pink" />
        </p>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="mono-label text-muted">Email</p>
            {/* TODO: replace the placeholder address in src/data/content.ts */}
            <a
              href={`mailto:${SITE.email}`}
              className="group mt-3 inline-block break-all font-serif text-[clamp(1.8rem,4.6vw,3.8rem)] leading-tight"
            >
              <span className="bg-gradient-to-r from-pink to-pink bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {SITE.email}
              </span>
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button type="button" onClick={copy} className="btn">
                  {copied ? "Copied ✓" : "Copy email"}
                </button>
              </Magnetic>
              <span role="status" aria-live="polite" className="mono-label text-muted">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="mono-label text-muted">Elsewhere</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 transition-all duration-300 hover:pl-3"
                  >
                    <span className="font-serif text-3xl">{s.label}</span>
                    <span className="flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-pink">
                      {s.handle}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
