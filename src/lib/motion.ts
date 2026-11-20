/** True when the visitor asked their OS to reduce motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on touch-first devices where hover / pointer effects make no sense. */
export const isCoarsePointer = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;
