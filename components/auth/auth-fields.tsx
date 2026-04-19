import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** EmailField renders an email input and delayed validation message. */
export function EmailField({
  error,
  id,
  onBlur,
  onChange,
  shouldShowError,
  value,
}: {
  error: string;
  id: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  shouldShowError: boolean;
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        type="email"
        value={value}
        placeholder="you@example.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
      {shouldShowError && error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** PasswordField renders a password input with a show/hide control. */
export function PasswordField({
  error,
  id,
  isVisible,
  onBlur,
  onChange,
  onToggleVisibility,
  value,
}: {
  error?: string;
  id: string;
  isVisible: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Password</Label>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          value={value}
          placeholder="Enter your password"
          className={value ? "pr-10" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <button
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            onClick={onToggleVisibility}
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
