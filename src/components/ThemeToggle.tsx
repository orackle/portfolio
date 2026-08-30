import { useTheme, type ThemeName } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme switcher">
      {themes.map((t: ThemeName) => (
        <button
          key={t}
          className={`theme-toggle__dot${theme === t ? " is-active" : ""}`}
          data-swatch={t}
          aria-label={`Switch to ${t} theme`}
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
        />
      ))}
    </div>
  );
}
