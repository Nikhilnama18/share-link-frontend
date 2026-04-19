# Share Link Frontend Agent Guide

This file gives Codex and other coding agents the project context needed before making changes.

## Project Purpose

Share Link is a frontend for an Instagram automation product. The app is being rebuilt from a clean foundation with production-level structure, readable files, and incremental feature work.

For now, the frontend contains only the app shell:

- A homepage with a global header.
- Brand text on the left: `Share the link`.
- A dark/light theme toggle and `Login / Signup` button on the right.
- No auth flow or marketing content yet.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS for styling and design tokens
- Chakra UI for future accessible UI primitives where useful
- Official shadcn registry components for shared UI primitives
- `next-themes` for light/dark mode

## Current File Structure

- `app/layout.tsx`: Root HTML layout and global provider wrapper.
- `app/page.tsx`: Homepage. Keep it small; compose sections/components here instead of placing large UI directly inside the page.
- `app/not-found.tsx`: Minimal fallback for unmatched routes.
- `app/globals.css`: Tailwind layers and global CSS theme tokens.
- `components/icons/google-icon.tsx`: Reusable Google brand mark.
- `components/providers/app-providers.tsx`: Client-side providers for `next-themes` and Chakra UI.
- `components/auth/auth-modal.tsx`: Header auth modal for email and Google login entry.
- `components/layout/site-header.tsx`: Global header shell.
- `components/ui/button.tsx`: Official shadcn registry Button component.
- `components/ui/dialog.tsx`: Official shadcn registry Dialog component.
- `components/ui/input.tsx`: Official shadcn registry Input component.
- `components/ui/label.tsx`: Official shadcn registry Label component.
- `components/ui/separator.tsx`: Official shadcn registry Separator component.
- `components/ui/switch.tsx`: Official shadcn registry Switch component.
- `components/ui/theme-toggle.tsx`: Dark/light mode toggle composed with the shadcn Switch.
- `components/ui/theme-toggle-client.tsx`: No-SSR wrapper that prevents persisted theme state from causing hydration mismatches.
- `lib/utils.ts`: Shared utility helpers such as `cn`.
- `.github/pull_request_template.md`: Pull request template.
- `components.json`: shadcn CLI configuration.

## Architecture Rules

- Keep files focused and readable.
- Prefer small components over large page files.
- Put reusable layout components in `components/layout`.
- Put reusable UI primitives in `components/ui`.
- Put app-wide providers in `components/providers`.
- Put shared non-React helpers in `lib`.
- Use `app/page.tsx` only for route composition.
- Do not reintroduce the old Shards UI or Bootstrap setup.
- Do not hand-roll reusable UI primitives when an official shadcn component exists.
- Avoid adding new dependencies unless they clearly reduce complexity or match the chosen stack.

## Styling Rules

- Use Tailwind classes for most styling.
- Use official shadcn registry components via `npx shadcn@latest add <component>` for shared UI primitives.
- Use CSS variables in `app/globals.css` for theme tokens.
- Support both dark and light mode.
- Dark mode is the default.
- Keep colors balanced and avoid one-note palettes.
- Buttons and cards should use modest radius, currently driven by `--radius: 0.5rem`.
- Do not add decorative gradient blobs/orbs.

## Component Comments

Add a short comment above each exported component explaining what it does.

Examples:

```tsx
/** SiteHeader renders the global brand bar used across the app shell. */
export function SiteHeader() {}
```

For complex methods, add a concise comment explaining why the method exists, not what every line does.

## Validation Commands

Run these before handing work back:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` uses `next build --webpack` because the local sandbox can block Turbopack worker ports.

## Working Style

- Work one feature at a time.
- Keep the first implementation small and clean.
- Do not build large flows before the basic shell and component structure are agreed.
- Preserve the existing clean structure unless there is a clear reason to change it.
- If a user asks for a UI feature, create dedicated components instead of putting everything in `app/page.tsx`.
