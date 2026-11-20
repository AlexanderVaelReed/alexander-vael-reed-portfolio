import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initLenis } from "./lib/lenis";
import "./index.css";

// Start smooth scrolling before React mounts so the preloader can pause it.
initLenis();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
