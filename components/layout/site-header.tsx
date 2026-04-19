import Link from "next/link";
import { AuthModal } from "@/components/auth/auth-modal";
import { ThemeToggleClient } from "@/components/ui/theme-toggle-client";

/** SiteHeader renders the global brand bar used across the app shell. */
export function SiteHeader() {
  return (
    <header className="border-b bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/76">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-normal text-foreground">
          Share the link
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggleClient />
          <AuthModal />
        </div>
      </div>
    </header>
  );
}
