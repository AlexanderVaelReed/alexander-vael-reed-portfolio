import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { SITE } from "../data/content";
import SplitReveal from "./SplitReveal";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const WEEKS = 53;
const DAYS = 7;

/** Deterministic PRNG so the decorative grid is identical on every load. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Intensity levels 0–4, weighted toward weekdays and "streaky" weeks. */
function buildGrid(): number[] {
  const rand = mulberry32(1405);
  const cells: number[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const weekEnergy = 0.35 + rand() * 0.65;
    for (let d = 0; d < DAYS; d++) {
      const weekend = d === 0 || d === 6;
      const p = rand() * weekEnergy * (weekend ? 0.55 : 1.15);
      cells.push(p < 0.18 ? 0 : p < 0.34 ? 1 : p < 0.5 ? 2 : p < 0.68 ? 3 : 4);
    }
  }
  return cells;
}

const LEVEL_CLASS = ["bg-ink/10", "bg-ink/30", "bg-ink/50", "bg-ink/75", "bg-ink"] as const;

export default function GitHub() {
  const grid = useRef<HTMLDivElement>(null);
  const cells = useMemo(buildGrid, []);

  useLayoutEffect(() => {
    const el = grid.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-cell]"), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { amount: 1.6, grid: [DAYS, WEEKS], from: "start", axis: "x" },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="relative overflow-hidden bg-pink px-5 py-28 text-ink md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="mono-label flex items-center justify-between">
          <span>§ 04</span>
          <span>github.md</span>
        </div>
        <div className="my-4 h-px bg-ink/30" />

        <h2
          id="github-title"
          className="font-serif text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] tracking-tight"
        >
          <SplitReveal text="Read the code." scroll className="block" />
          <SplitReveal text="Judge the work." scroll delay={0.15} className="block italic" />
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed">
              Everything I build in the open — experiments, tools and shipped products —
              lives on GitHub. Browse the repositories, read the commits, open an issue.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Magnetic strength={0.2}>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink px-9 py-6 text-lg"
              >
                View my work on GitHub <span className="arrow" aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Decorative contribution texture — not real data. */}
        <div className="mt-16 md:mt-24">
          <div
            ref={grid}
            aria-hidden="true"
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DAYS}, auto)`,
              gridAutoFlow: "column",
            }}
          >
            {cells.map((level, i) => (
              <span
                key={i}
                data-cell
                className={`aspect-square rounded-[2px] ${LEVEL_CLASS[level]}`}
              />
            ))}
          </div>
          <p className="mono-label mt-4 flex justify-between opacity-80">
            <span>Decorative — see the real activity graph on GitHub</span>
            <span aria-hidden="true">Less ▫▫▪▪▪ More</span>
          </p>
        </div>
      </div>
    </section>
  );
}
