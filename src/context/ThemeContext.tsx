import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeName = "blue";

const THEMES: ThemeName[] = ["blue"];
const STORAGE_KEY = "portfolio-theme";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  cycleTheme: () => void;
  themes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): ThemeName {
  return "blue";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("blue");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "blue");
    window.localStorage.setItem(STORAGE_KEY, "blue");
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: "blue",
      setTheme: () => {},
      cycleTheme: () => {},
      themes: THEMES,
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
