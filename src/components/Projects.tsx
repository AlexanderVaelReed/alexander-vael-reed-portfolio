import { useLayoutEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { PROJECTS } from "../data/content";
import type { Project, Tone } from "../data/content";
import SectionHeader from "./SectionHeader";

const TONES: Record<Tone, string> = {
  cobalt: "bg-cobalt text-white border-ink",
  pink: "bg-pink text-ink border-ink",
  paper: "bg-paper text-ink border-ink",
  sand: "bg-sand text-ink border-ink",
  ink: "bg-ink text-paper border-paper/40",
};

/** "#" means the real link has not been added yet — keep it inert. */
const inert = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (href === "#") e.preventDefault();
};

function ProjectCard({ project }: { project: Project }) {
  const isPlaceholder = project.demo === "#";
  return (
    <article
      className={`group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-3xl border-2 p-7 transition-all duration-500 ease-out hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_0_var(--fg)] md:p-8 ${TONES[project.tone]}`}
    >
      {/* Decorative orb that swells on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-current opacity-10 transition-transform duration-700 ease-out group-hover:scale-[2.2]"
      />

      <div className="relative flex items-start justify-between">
        <span className="mono-label">{project.index}</span>
        <span className="mono-label text-right opacity-80">{project.kind}</span>
      </div>

      <div className="relative mt-16">
        <h3 className="font-serif text-5xl leading-none md:text-6xl">{project.title}</h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed opacity-90">
          {project.blurb}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-8 flex items-center gap-6 text-sm font-medium">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 underline decoration-1 underline-offset-4 transition-all hover:gap-2.5"
        >
          GitHub <span aria-hidden="true">↗</span>
          <span className="sr-only">: {project.title} repository (opens in a new tab)</span>
        </a>
        <a
          href={project.demo}
          onClick={inert(project.demo)}
          {...(isPlaceholder
            ? { "aria-disabled": true, title: "Live demo coming soon" }
            : { target: "_blank", rel: "noopener noreferrer" })}
          className={`inline-flex items-center gap-1.5 underline decoration-1 underline-offset-4 transition-all hover:gap-2.5 ${
            isPlaceholder ? "opacity-70" : ""
          }`}
        >
          Live demo <span aria-hidden="true">↗</span>
          <span className="sr-only">: {project.title}{isPlaceholder ? " (coming soon)" : " (opens in a new tab)"}</span>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const grid = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const el = grid.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      gsap.set(cards, { opacity: 0, y: 90, rotate: 1.5 });

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.14,
            overwrite: true,
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative bg-surface px-5 py-28 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader id="work" index="02" file="selected-work.md" title="Selected Work" />

        <ul ref={grid} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.title} data-card>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
