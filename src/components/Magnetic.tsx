import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";

interface Props {
  children: ReactNode;
  strength?: number;
}

/** Micro-interaction: the wrapped control leans toward the pointer. */
export default function Magnetic({ children, strength = 0.28 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.45)" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
