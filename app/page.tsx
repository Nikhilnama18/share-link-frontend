import { SiteHeader } from "@/components/layout/site-header";

/** Home keeps the first app slice intentionally empty below the shell header. */
export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
    </main>
  );
}
