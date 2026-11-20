# Alexander Vael Reed — Portfolio

Single-page portfolio built with **React + Vite + TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger** and **Lenis**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build in /dist
npm run preview  # serve the production build locally
```

## Make it yours

| What | Where |
| --- | --- |
| Name, tagline, **email**, GitHub URL | `src/data/content.ts` → `SITE` |
| About copy and pillars | `src/data/content.ts` → `MANIFESTO`, `PILLARS` |
| **Projects** (sample content — replace!) | `src/data/content.ts` → `PROJECTS` (`repo`, `demo`; a demo of `"#"` renders as "coming soon") |
| Skills & marquee | `src/data/content.ts` → `SKILL_GROUPS`, `MARQUEE` |
| **LinkedIn / X** (placeholders) | `src/data/content.ts` → `SOCIALS` |
| **Profile photo** | overwrite `public/profile.jpg` (4:5 portrait works best) or edit `PHOTO_SRC` in `src/components/Hero.tsx` |
| Colours | `tailwind.config.js` (palette) and `src/index.css` (theme tokens) |

Search the project for `TODO` to find every placeholder.

## Deploy

- **Vercel / Netlify:** import the repo, framework preset *Vite*, done.
- **GitHub Pages (project site):** set `base: "/your-repo-name/"` in `vite.config.ts`, run `npm run build`, publish `dist/`.
- **GitHub Pages (user site, `username.github.io`):** keep `base: "/"`.

## Notes

- Dark theme by default; the sun/moon button switches to light and remembers the choice.
- Honours `prefers-reduced-motion`: smooth scroll and animations are disabled and content is shown immediately.
- The contribution grid in the GitHub section is a **decorative texture**, not live data.
- Structure: `src/components` (sections + motion primitives), `src/lib` (GSAP/Lenis setup), `src/hooks`, `src/data`.
