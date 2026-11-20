import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import SplitReveal from "./SplitReveal";

interface Props {
  /** Section id — the heading gets `${id}-title` for aria-labelledby. */
  id: string;
  index: string;
  file: string;
  title: string;
}

/** Museum-placard style header: "§ 01 — about.md", a drawn rule, then a big serif title. */
export default function SectionHeader({ id, index, file, title }: Props) {
  const rule = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rule.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="mb-14 md:mb-24">
      <div className="mono-label flex items-center justify-between text-muted">
        <span>§ {index}</span>
        <span>{file}</span>
      </div>
      <div ref={rule} className="my-4 h-px origin-left bg-line" />
      <h2
        id={`${id}-title`}
        className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight"
      >
        <SplitReveal text={title} scroll />
      </h2>
    </header>
  );
}
