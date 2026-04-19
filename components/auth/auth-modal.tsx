"use client";

import { FormEvent, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type AuthView = "login" | "signup";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasLetterPattern = /[a-zA-Z]/;
const hasNumberPattern = /\d/;

/** AuthModal renders the login/signup entry modal from the header CTA. */
export function AuthModal() {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");

  /** Stops the browser reload while backend auth wiring is added later. */
  const handleAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  /** Switches auth views while carrying forward only valid email addresses. */
  const switchView = (nextView: AuthView) => {
    if (email && !emailPattern.test(email)) {
      setEmail("");
    }

    setView(nextView);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="rounded-full bg-[#1877f2] px-5 text-white shadow-sm hover:bg-[#166fe5]"
        >
          Get started
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 sm:rounded-2xl">
        {view === "login" ? (
          <LoginForm
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleAuthSubmit}
            onShowSignup={() => switchView("signup")}
          />
        ) : (
          <SignupForm
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleAuthSubmit}
            onShowLogin={() => switchView("login")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

/** LoginForm collects email and password credentials for existing users. */
function LoginForm({
  email,
  onEmailChange,
  onShowSignup,
  onSubmit,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onShowSignup: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [password, setPassword] = useState("");
  const [hasTouchedEmail, setHasTouchedEmail] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const emailError = useEmailError(email, hasTouchedEmail);
  const isEmailLoginDisabled = !emailPattern.test(email) || !password;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-semibold tracking-normal">
          Log in to Share The Link
        </DialogTitle>
        <DialogDescription className="sr-only">
          Log in with email and password, or continue with Google.
        </DialogDescription>
      </DialogHeader>

      <form className="mt-2 grid gap-4" onSubmit={onSubmit}>
        <EmailField
          id="login-email"
          value={email}
          error={emailError}
          hasTouched={hasTouchedEmail}
          onBlur={() => setHasTouchedEmail(true)}
          onChange={onEmailChange}
        />

        <PasswordField
          id="login-password"
          value={password}
          isVisible={isPasswordVisible}
          onChange={setPassword}
          onToggleVisibility={() => setIsPasswordVisible((current) => !current)}
        />

        <button
          type="button"
          className="justify-self-start text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground"
        >
          Forgot password ?
        </button>

        <Button
          type="submit"
          disabled={isEmailLoginDisabled}
          className="h-11 rounded-full bg-[#185f35] text-white hover:bg-[#144f2c]"
        >
          Login in with email
        </Button>
      </form>

      <AuthDivider />

      <Button type="button" variant="outline" className="h-11 rounded-full">
        <GoogleIcon />
        Log in with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account ?{" "}
        <button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault();
            onShowSignup();
          }}
          onClick={onShowSignup}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Join Share The Link
        </button>
      </p>
    </>
  );
}

/** SignupForm collects the basic account details needed to create a user. */
function SignupForm({
  email,
  onEmailChange,
  onShowLogin,
  onSubmit,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onShowLogin: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hasTouchedEmail, setHasTouchedEmail] = useState(false);
  const [hasTouchedPassword, setHasTouchedPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const emailError = useEmailError(email, hasTouchedEmail);
  const passwordError = useSignupPasswordError(password, hasTouchedPassword);
  const hasValidPassword = getSignupPasswordError(password) === "";
  const isSignupDisabled = !name.trim() || !emailPattern.test(email) || !hasValidPassword;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-semibold tracking-normal">
          Join Share The Link for free
        </DialogTitle>
        <DialogDescription className="text-center">
          Automate your replies and DM&apos;s in Instagram.
        </DialogDescription>
      </DialogHeader>

      <Button type="button" variant="outline" className="mt-2 h-11 rounded-full">
        <GoogleIcon />
        Continue with Google
      </Button>

      <AuthDivider />

      <form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="signup-name">Name</Label>
          <Input
            id="signup-name"
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <EmailField
          id="signup-email"
          value={email}
          error={emailError}
          hasTouched={hasTouchedEmail}
          onBlur={() => setHasTouchedEmail(true)}
          onChange={onEmailChange}
        />

        <PasswordField
          id="signup-password"
          value={password}
          error={passwordError}
          isVisible={isPasswordVisible}
          onBlur={() => setHasTouchedPassword(true)}
          onChange={setPassword}
          onToggleVisibility={() => setIsPasswordVisible((current) => !current)}
        />

        <Button
          type="submit"
          disabled={isSignupDisabled}
          className="h-11 rounded-full bg-[#185f35] text-white hover:bg-[#144f2c]"
        >
          Continue with email
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault();
            onShowLogin();
          }}
          onClick={onShowLogin}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Log in
        </button>
      </p>
    </>
  );
}

/** EmailField renders an email input and delayed validation message. */
function EmailField({
  error,
  hasTouched,
  id,
  onBlur,
  onChange,
  value,
}: {
  error: string;
  hasTouched: boolean;
  id: string;
  onBlur: () => void;
  onChange: (value: string) => void;
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
      {hasTouched && error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** PasswordField renders a password input with a show/hide control. */
function PasswordField({
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

/** AuthDivider separates email and social auth choices. */
function AuthDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <Separator className="flex-1" />
      <span className="text-sm font-medium text-muted-foreground">or</span>
      <Separator className="flex-1" />
    </div>
  );
}

/** useEmailError returns a delayed validation error for email fields. */
function useEmailError(email: string, hasTouchedEmail: boolean) {
  return useMemo(() => {
    if (!hasTouchedEmail || !email || emailPattern.test(email)) {
      return "";
    }

    return "Enter a valid email address.";
  }, [email, hasTouchedEmail]);
}

/** useSignupPasswordError returns a delayed validation error for signup passwords. */
function useSignupPasswordError(password: string, hasTouchedPassword: boolean) {
  return useMemo(() => {
    if (!hasTouchedPassword) {
      return "";
    }

    return getSignupPasswordError(password);
  }, [password, hasTouchedPassword]);
}

/** getSignupPasswordError validates the minimum password requirements. */
function getSignupPasswordError(password: string) {
  if (!password) {
    return "Enter a password.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (!hasLetterPattern.test(password)) {
    return "Password must include at least 1 character.";
  }

  if (!hasNumberPattern.test(password)) {
    return "Password must include at least 1 number.";
  }

  return "";
}
