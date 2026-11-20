import { useLayoutEffect, useRef } from "react";
import type { ElementType } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
  /** Gate the animation (e.g. wait for the preloader). Defaults to true. */
  play?: boolean;
  /** Trigger on scroll instead of immediately. */
  scroll?: boolean;
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word "mask" reveal: each word slides up from behind an
 * overflow-hidden line. Screen readers get the plain text via sr-only.
 */
export default function SplitReveal({
  text,
  className = "",
  as: Tag = "span",
  play = true,
  scroll = false,
  delay = 0,
  stagger = 0.07,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.set(inner, { yPercent: 115 });
      if (!play) return;
      gsap.to(inner, {
        yPercent: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: scroll
          ? { trigger: el, start: "top 88%", once: true }
          : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [play, scroll, delay, stagger, text]);

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
            >
              <span data-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
