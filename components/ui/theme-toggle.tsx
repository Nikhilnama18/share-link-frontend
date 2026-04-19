"use client";

import { useTheme } from "next-themes";

/** ThemeToggle switches the app between the default dark theme and light theme. */
export function ThemeToggle() {
  const { forcedTheme, resolvedTheme, setTheme, theme } = useTheme();
  const currentTheme = forcedTheme || theme || resolvedTheme || "dark";
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-16 items-center rounded-full border bg-muted p-1 transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className={`grid h-7 w-7 place-items-center rounded-full bg-background text-foreground shadow-sm transition-transform ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

/** SunIcon labels the light-mode side of the theme toggle. */
function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2.75v2.1M12 19.15v2.1M4.85 4.85l1.48 1.48M17.67 17.67l1.48 1.48M2.75 12h2.1M19.15 12h2.1M4.85 19.15l1.48-1.48M17.67 6.33l1.48-1.48"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/** MoonIcon labels the dark-mode side of the theme toggle. */
function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.1 14.7A7.2 7.2 0 0 1 9.3 3.9 8.4 8.4 0 1 0 20.1 14.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
