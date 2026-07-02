export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "dua-theme";

/**
 * Resolves the initial theme state from localStorage or system preferences, SSR safe.
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored as Theme;
    }
    
    // Fallback to system preference
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    return media.matches ? "dark" : "light";
  } catch {
    return "light";
  }
};
