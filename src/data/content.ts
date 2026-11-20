// ─────────────────────────────────────────────────────────────────────────────
// All editable copy lives here. Search for "TODO" to find placeholders you
// should replace with real details (email, LinkedIn/X handles, project links).
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Alexander Vael Reed",
  firstName: "Alexander",
  lastName: "Vael Reed",
  role: "Software Engineer",
  tagline: "Engineering systems that scale. Building with intention.",
  github: "https://github.com/AlexanderVaelReed",
  // TODO: replace with your real email address.
  email: "alexandervaelreeddev@example.com",
} as const;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export const MANIFESTO: readonly string[] = [
  "I build software the way good furniture is built: to be used, to last, and to feel inevitable.",
  "I think in systems — queues, boundaries, failure modes, and the quiet contracts between services and the people who depend on them.",
  "I care about craft. Clear interfaces. Honest abstractions. Code the next engineer is glad to inherit.",
  "And I ship. Real products, in real hands, with real consequences.",
];

export const PILLARS = [
  {
    n: "01",
    title: "Craft",
    text: "Small details compound. Naming, structure and tests are part of the product.",
  },
  {
    n: "02",
    title: "Systems",
    text: "Design for the failure case first. Scale is a property of the architecture, not a late patch.",
  },
  {
    n: "03",
    title: "Shipping",
    text: "Momentum beats perfection. Release early, measure honestly, simplify relentlessly.",
  },
] as const;

export type Tone = "cobalt" | "pink" | "paper" | "sand" | "ink";

export interface Project {
  index: string;
  title: string;
  kind: string;
  blurb: string;
  stack: readonly string[];
  tone: Tone;
  /** TODO: point each to the real repository. */
  repo: string;
  /** TODO: point each to the live demo. "#" renders as an inert placeholder. */
  demo: string;
}

// Sample projects — replace titles, blurbs and links with your own work.
export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    title: "Meridian",
    kind: "Distributed systems",
    blurb:
      "An event-driven workflow engine with durable queues, idempotent retries and first-class observability.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Redis"],
    tone: "cobalt",
    repo: SITE.github,
    demo: "#",
  },
  {
    index: "02",
    title: "Lumen",
    kind: "Applied AI",
    blurb:
      "A retrieval-augmented research assistant that cites its sources and tells you when it does not know.",
    stack: ["Python", "FastAPI", "pgvector", "LLMs"],
    tone: "pink",
    repo: SITE.github,
    demo: "#",
  },
  {
    index: "03",
    title: "Atlas",
    kind: "Realtime product",
    blurb:
      "A live analytics dashboard streaming millions of events with sub-second charts and accessible by default.",
    stack: ["React", "TypeScript", "WebSockets", "ClickHouse"],
    tone: "paper",
    repo: SITE.github,
    demo: "#",
  },
  {
    index: "04",
    title: "Foundry",
    kind: "Developer platform",
    blurb:
      "Opinionated infrastructure templates and a CLI that take a service from idea to production in minutes.",
    stack: ["Node.js", "Terraform", "AWS", "Docker"],
    tone: "sand",
    repo: SITE.github,
    demo: "#",
  },
  {
    index: "05",
    title: "Cadence",
    kind: "Collaboration",
    blurb:
      "A local-first collaborative notes app with conflict-free editing that works beautifully offline.",
    stack: ["React", "Yjs", "WebRTC", "IndexedDB"],
    tone: "ink",
    repo: SITE.github,
    demo: "#",
  },
  {
    index: "06",
    title: "Sentinel",
    kind: "ML & observability",
    blurb:
      "Anomaly detection on service telemetry that pages humans only when the signal is worth their sleep.",
    stack: ["Python", "PyTorch", "Kubernetes", "Prometheus"],
    tone: "cobalt",
    repo: SITE.github,
    demo: "#",
  },
];

export const MARQUEE: readonly string[] = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "PyTorch",
  "LLM Tooling",
  "Terraform",
  "GraphQL",
];

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    accent: "bg-cobalt",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "Accessibility"],
  },
  {
    title: "Backend",
    accent: "bg-pink",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "REST & GraphQL"],
  },
  {
    title: "Cloud & DevOps",
    accent: "bg-sand",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Observability"],
  },
  {
    title: "AI / ML",
    accent: "bg-cobalt",
    items: ["PyTorch", "scikit-learn", "RAG pipelines", "Vector databases", "Evaluation"],
  },
  {
    title: "Practice",
    accent: "bg-pink",
    items: ["Systems design", "Testing", "Code review", "Technical writing", "Mentoring"],
  },
] as const;

export const SOCIALS = [
  {
    label: "GitHub",
    handle: "@AlexanderVaelReed",
    href: SITE.github,
  },
  {
    label: "LinkedIn",
    // TODO: replace with your real LinkedIn URL / handle.
    handle: "/in/your-handle",
    href: "https://www.linkedin.com/in/your-handle",
  },
  {
    label: "X",
    // TODO: replace with your real X / Twitter URL / handle.
    handle: "@your_handle",
    href: "https://x.com/your_handle",
  },
] as const;
