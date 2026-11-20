import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./motion";

let lenis: Lenis | null = null;

/**
 * Creates the Lenis instance and wires it into GSAP's ticker so that
 * ScrollTrigger and Lenis share one animation loop.
 * Skipped entirely when the visitor prefers reduced motion (native scroll).
 */
export function initLenis(): void {
  if (lenis || prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export const stopScroll = (): void => lenis?.stop();
export const startScroll = (): void => lenis?.start();

/** Smooth-scroll to a section by id (falls back to a native jump). */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView();
  }
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo(0, 0);
}
