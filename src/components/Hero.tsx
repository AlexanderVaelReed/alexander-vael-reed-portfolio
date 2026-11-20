import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { scrollToId } from "../lib/lenis";
import { SITE } from "../data/content";
import SplitReveal from "./SplitReveal";
import Magnetic from "./Magnetic";

interface Props {
  /** Becomes true when the preloader curtain starts lifting. */
  ready: boolean;
}

/**
 * ── PROFILE PHOTO ────────────────────────────────────────────────────────────
 * The portrait lives at /public/profile.jpg. To use a different image, either
 * overwrite that file or change PHOTO_SRC below. A 4:5 portrait works best.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PHOTO_SRC = `${import.meta.env.BASE_URL}profile.jpg`;

export default function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null);

  // Ambient motion: floating shapes + scroll parallax. Runs once.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-float]").forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 ? 22 : -22,
          x: i % 3 ? 12 : -12,
          rotation: i % 2 ? 8 : -8,
          duration: 3.2 + i * 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      el.querySelectorAll<HTMLElement>("[data-speed]").forEach((node) => {
        const speed = Number(node.dataset.speed ?? 0);
        gsap.to(node, {
          y: speed * -140,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Entrance sequence — waits for the preloader.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-in]");
      const frame = el.querySelector<HTMLElement>("[data-frame]");
      const photo = el.querySelector<HTMLElement>("[data-photo]");

      gsap.set(items, { opacity: 0, y: 28 });
      if (frame) gsap.set(frame, { opacity: 0, y: 48 });
      if (photo) gsap.set(photo, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 });
      if (!ready) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (frame) tl.to(frame, { opacity: 1, y: 0, duration: 1.1 }, 0.1);
      if (photo) {
        tl.to(
          photo,
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.6, ease: "expo.out" },
          0.3,
        );
      }
      tl.to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.7);
    }, el);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 md:px-10"
    >
      {/* Atmosphere: glow, grid and floating shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-cobalt/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-pink/20 blur-[120px]" />
        <div className="hero-grid absolute inset-0" />

        <div data-speed="0.5" className="absolute left-[6%] top-[22%]">
          <div data-float className="h-5 w-5 rounded-full bg-pink" />
        </div>
        <div data-speed="0.9" className="absolute left-[46%] top-[12%] hidden md:block">
          <div data-float className="h-9 w-9 rotate-12 bg-cobalt" />
        </div>
        <div data-speed="0.7" className="absolute bottom-[16%] left-[40%] hidden md:block">
          <div data-float className="font-mono text-4xl text-pink">+</div>
        </div>
        <div data-speed="0.35" className="absolute -bottom-24 -right-24 hidden md:block">
          <svg className="spin-slow" width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="150" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="4 10" />
            <circle cx="160" cy="160" r="110" stroke="#ff2e88" strokeOpacity="0.5" strokeDasharray="2 8" />
          </svg>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[110rem] items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p
            data-in
            className="mono-label mb-7 flex items-center gap-3 text-muted"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-pink" />
            # portfolio.md — {new Date().getFullYear()}
          </p>

          <h1 className="font-serif text-[clamp(3.6rem,12.5vw,11rem)] leading-[0.88] tracking-tight">
            <SplitReveal text={SITE.firstName} play={ready} className="block" />
            <SplitReveal
              text={SITE.lastName}
              play={ready}
              delay={0.15}
              className="block italic text-pink"
            />
          </h1>

          <p
            data-in
            className="mt-9 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.22em]"
          >
            <span aria-hidden="true" className="h-px w-10 bg-fg" />
            {SITE.role}
          </p>

          <p data-in className="mt-6 max-w-xl font-serif text-2xl leading-snug text-fg md:text-4xl">
            {SITE.tagline}
          </p>

          <div data-in className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
                className="btn btn-solid"
              >
                View selected work <span className="arrow" aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                GitHub <span className="arrow" aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Portrait — arched "museum frame" */}
        <div
          data-speed="0.25"
          className="relative mx-auto w-[min(78vw,24rem)] lg:col-span-5 lg:mx-0 lg:justify-self-end"
        >
          <div data-frame className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-5 top-8 h-full w-full rounded-b-[2rem] rounded-t-full bg-cobalt"
            />
            <div aria-hidden="true" className="absolute -right-6 -top-6 z-10">
              <div data-float className="h-24 w-24 rounded-full bg-pink" />
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-full border-2 border-fg bg-paper">
              {/* REPLACE: swap /public/profile.jpg (or PHOTO_SRC above) with a different photo. */}
              <img
                data-photo
                src={PHOTO_SRC}
                width={864}
                height={1152}
                alt="Portrait of Alexander Vael Reed"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <p className="mono-label mt-5 text-muted">
              Fig. 01 — {SITE.name}, {SITE.role}
            </p>
          </div>
        </div>
      </div>

      <div
        data-in
        aria-hidden="true"
        className="mono-label absolute bottom-6 left-5 flex items-center gap-3 text-muted md:left-10"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="scroll-line absolute inset-0 bg-pink" />
        </span>
        Scroll
      </div>
    </section>
  );
}
