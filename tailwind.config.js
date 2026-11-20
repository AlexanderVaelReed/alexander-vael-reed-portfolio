/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fixed "diorama" palette — identical in both themes.
        ink: "#0b0b0f",
        paper: "#f1ece2",
        cobalt: "#2f4bff",
        pink: "#ff2e88",
        sand: "#d9cfbd",
        // Theme-aware tokens (driven by CSS variables in src/index.css).
        base: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
