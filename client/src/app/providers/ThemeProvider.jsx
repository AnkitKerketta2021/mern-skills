import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const THEMES = [
  { id: "dark", label: "Noir", icon: "◐" },
  { id: "light", label: "Ivory", icon: "☼" },
  { id: "fire", label: "Ember", icon: "♨" },
  { id: "ice", label: "Frost", icon: "❄" },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ms-theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ms-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme])}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
