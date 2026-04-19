import { Separator } from "@/components/ui/separator";

/** AuthDivider separates email and social auth choices. */
export function AuthDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <Separator className="flex-1" />
      <span className="text-sm font-medium text-muted-foreground">or</span>
      <Separator className="flex-1" />
    </div>
  );
}
