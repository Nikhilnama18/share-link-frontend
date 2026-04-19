"use client";

import { useState } from "react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthDivider } from "@/components/auth/auth-divider";
import { EmailField, PasswordField } from "@/components/auth/auth-fields";
import type { AuthSubmitHandler } from "@/components/auth/auth-types";
import {
  emailPattern,
  getSignupPasswordError,
  useEmailError,
  useSignupPasswordError,
} from "@/components/auth/auth-validation";

/** SignupForm collects the basic account details needed to create a user. */
export function SignupForm({
  email,
  onEmailChange,
  onShowLogin,
  onSubmit,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onShowLogin: () => void;
  onSubmit: AuthSubmitHandler;
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [blurredEmail, setBlurredEmail] = useState("");
  const [hasTouchedPassword, setHasTouchedPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldShowEmailError = blurredEmail === email;
  const emailError = useEmailError(email, shouldShowEmailError);
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
          shouldShowError={shouldShowEmailError}
          onBlur={() => setBlurredEmail(email)}
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
