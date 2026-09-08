import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";

const ThemeContext = createContext(null);

export const THEMES = [
  {
    id: "dark",
    label: "Dark Theme",
    icon: <DarkModeRoundedIcon />,
  },
  {
    id: "light",
    label: "Light Theme",
    icon: <LightModeRoundedIcon />,
  },
  {
    id: "fire",
    label: "Fire Theme",
    icon: <LocalFireDepartmentRoundedIcon />,
  },
  {
    id: "ice",
    label: "Ice Theme",
    icon: <AcUnitRoundedIcon />,
  },
  {
    id: "forest",
    label: "Forest Theme",
    icon: <ForestRoundedIcon />,
  },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ms-theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ms-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEMES,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}