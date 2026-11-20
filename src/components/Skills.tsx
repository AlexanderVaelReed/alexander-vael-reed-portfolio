import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { MARQUEE, SKILL_GROUPS } from "../data/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

/** One infinitely scrolling row. Content is rendered twice for a seamless loop. */
function MarqueeRow({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: 46, ease: "none", repeat: -1 },
    );
    // Ease the marquee down while hovered.
    const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
    const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", fast);

    return () => {
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", fast);
      tween.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reverse]);

  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div ref={track} className="flex w-max items-center">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={`flex items-center whitespace-nowrap font-serif text-[clamp(3rem,8vw,7rem)] leading-tight ${
              outline ? "italic text-pink" : ""
            }`}
          >
            {word}
            <span className="mx-6 text-[0.5em] text-cobalt md:mx-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative overflow-hidden py-28 md:py-44"
    >
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeader id="stack" index="03" file="stack.md" title="Skills & Stack" />
      </div>

      {/* Visual-only marquee; the same content is available as a list below. */}
      <div className="mb-20 space-y-2 md:mb-32">
        <MarqueeRow />
        <MarqueeRow reverse outline />
      </div>

      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <li key={group.title} className="bg-base">
              <Reveal delay={(i % 3) * 0.08} y={36} className="h-full p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-4xl">{group.title}</h3>
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 rounded-full ${group.accent}`}
                  />
                </div>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
