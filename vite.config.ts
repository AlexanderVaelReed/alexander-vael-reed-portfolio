import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages under a sub-path (e.g. /my-repo/), set base: "/my-repo/".
// For Vercel / user-site GitHub Pages, keep "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
