import Link from "next/link";
import { Button } from "@/components/ui/button";

/** NotFoundPage gives unmatched routes a small, accessible fallback. */
export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 text-foreground">
      <section className="text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <Button asChild className="mt-6">
          <Link href="/">Go home</Link>
        </Button>
      </section>
    </main>
  );
}
