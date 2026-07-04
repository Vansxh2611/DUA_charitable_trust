export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "dua-theme";

/**
 * Resolves the initial theme state from localStorage, defaulting to "light" mode.
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored as Theme;
    }
  } catch {
    // Ignore errors
  }
  return "light";
};
