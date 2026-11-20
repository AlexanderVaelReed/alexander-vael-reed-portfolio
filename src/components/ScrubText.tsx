import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

interface Props {
  text: string;
  className?: string;
}

/** Manifesto-style paragraph: words light up as you scroll past them. */
export default function ScrubText({ text, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        inner,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span data-word>{word}</span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </p>
  );
}
