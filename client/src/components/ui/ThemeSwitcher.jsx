import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "../../app/providers/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      {themes.map((t) => (
        <Tooltip
          key={t.id}
          title={t.label}
          placement="bottom"
          arrow
          enterDelay={300}
        >
          <button
            type="button"
            className={theme === t.id ? "active" : ""}
            onClick={() => setTheme(t.id)}
            aria-label={t.label}
          >
            {t.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}