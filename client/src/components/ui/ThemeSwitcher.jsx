import { useTheme } from "../../app/providers/ThemeProvider";
export default function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();
  return (
    <div className="theme-switcher">
      {themes.map((t) => (
        <button
          key={t.id}
          className={theme === t.id ? "active" : ""}
          onClick={() => setTheme(t.id)}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
