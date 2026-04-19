"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("@/components/ui/theme-toggle").then((module) => module.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-9 w-16 rounded-full border bg-primary"
      />
    ),
  },
);

/** ThemeToggleClient keeps persisted theme state out of server-rendered markup. */
export function ThemeToggleClient() {
  return <ThemeToggle />;
}
