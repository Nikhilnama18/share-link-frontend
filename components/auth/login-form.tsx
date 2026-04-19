"use client";

import { FormEvent, useState } from "react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthDivider } from "@/components/auth/auth-divider";
import { EmailField, PasswordField } from "@/components/auth/auth-fields";
import type { LoginFormValues } from "@/components/auth/auth-types";
import { emailPattern, useEmailError } from "@/components/auth/auth-validation";

/** LoginForm collects email and password credentials for existing users. */
export function LoginForm({
  email,
  onEmailChange,
  error,
  isSubmitting,
  onShowSignup,
  onSubmit,
}: {
  email: string;
  error?: string;
  isSubmitting?: boolean;
  onEmailChange: (value: string) => void;
  onShowSignup: () => void;
  onSubmit: (values: LoginFormValues) => void;
}) {
  const [password, setPassword] = useState("");
  const [blurredEmail, setBlurredEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldShowEmailError = blurredEmail === email;
  const emailError = useEmailError(email, shouldShowEmailError);
  const isEmailLoginDisabled = !emailPattern.test(email) || !password;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

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

      <form className="mt-2 grid gap-4" onSubmit={handleSubmit}>
        <EmailField
          id="login-email"
          value={email}
          error={emailError}
          shouldShowError={shouldShowEmailError}
          onBlur={() => setBlurredEmail(email)}
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
          disabled={isEmailLoginDisabled || isSubmitting}
          className="h-11 rounded-full bg-[#185f35] text-white hover:bg-[#144f2c]"
        >
          {isSubmitting ? "Logging in..." : "Log in with email"}
        </Button>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
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
