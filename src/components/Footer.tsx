import { SITE } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 md:px-10">
      <div className="mono-label mx-auto flex max-w-[110rem] flex-col gap-3 text-muted md:flex-row md:items-center md:justify-between">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <span>Built with React · Vite · Tailwind · GSAP · Lenis</span>
      </div>
    </footer>
  );
}
