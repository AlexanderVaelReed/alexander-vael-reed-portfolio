import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "avr-theme";

function readInitial(): Theme {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

/** Dark by default, with an optional light toggle persisted in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0b0b0f" : "#f1ece2");
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggle };
}
