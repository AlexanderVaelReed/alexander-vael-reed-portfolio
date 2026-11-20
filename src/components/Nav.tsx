import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { scrollToId, scrollToTop, startScroll, stopScroll } from "../lib/lenis";
import { useActiveSection } from "../hooks/useActiveSection";
import type { Theme } from "../hooks/useTheme";
import { NAV_LINKS } from "../data/content";

interface Props {
  ready: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

const IDS = NAV_LINKS.map((l) => l.id);

export default function Nav({ ready, theme, onToggleTheme }: Props) {
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);

  // Scroll progress bar.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !progress.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  // Entrance once the preloader lifts.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !header.current) return;
    const ctx = gsap.context(() => {
      gsap.set(header.current, { yPercent: -100, opacity: 0 });
      if (ready) {
        gsap.to(header.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          delay: 0.35,
        });
      }
    });
    return () => ctx.revert();
  }, [ready]);

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) stopScroll();
    else if (wasOpen.current) startScroll();
    wasOpen.current = open;
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu unlock scrolling before we animate.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-50">
        <div ref={bar} className="nav-glass">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-[110rem] items-center justify-between px-5 py-3.5 md:px-10"
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToTop();
              }}
              className="group flex items-center gap-2 font-serif text-2xl leading-none"
              aria-label="Alexander Vael Reed — back to top"
            >
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full bg-pink transition-transform duration-500 group-hover:scale-[2]"
              />
              AVR
            </a>

            <ul className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    aria-current={active === link.id ? "true" : undefined}
                    className={`nav-link text-sm ${
                      active === link.id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-transform duration-300 hover:rotate-12 hover:border-pink"
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
              >
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span
                    className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                      open ? "top-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                      open ? "top-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
        <div
          ref={progress}
          aria-hidden="true"
          className="h-[2px] origin-left scale-x-0 bg-pink"
        />
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-base px-6 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={go(link.id)}
                className="flex items-baseline gap-4 font-serif text-6xl leading-tight"
              >
                <span className="mono-label text-pink">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
