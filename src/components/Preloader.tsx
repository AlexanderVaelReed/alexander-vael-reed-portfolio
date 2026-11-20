import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/lenis";
import { SITE } from "../data/content";

interface Props {
  /** Fired while the curtain lifts — the hero entrance starts here. */
  onReveal: () => void;
  /** Fired when the curtain has fully left — safe to unmount. */
  onDone: () => void;
}

/** Cobalt curtain with a counter, then a cinematic wipe up to reveal the hero. */
export default function Preloader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const name = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal();
      onDone();
      return;
    }

    stopScroll();
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        startScroll();
        onDone();
      },
    });

    tl.fromTo(
      name.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
      0.1,
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) {
              count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            }
          },
        },
        0,
      )
      .to(name.current, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power3.in" }, 1.55)
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, 1.75)
      .add(onReveal, 2.05);

    return () => {
      tl.kill();
    };
  }, [onReveal, onDone]);

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-cobalt p-5 text-paper md:p-10"
    >
      <div className="mono-label flex justify-between">
        <span>portfolio.md</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div className="overflow-hidden">
        <p
          ref={name}
          className="font-serif text-[clamp(2.6rem,9vw,8rem)] leading-none"
        >
          {SITE.name}
        </p>
      </div>

      <div className="mono-label flex items-end justify-between">
        <span>Loading</span>
        <span ref={count} className="font-serif text-6xl normal-case tracking-normal md:text-8xl">
          000
        </span>
      </div>
    </div>
  );
}
