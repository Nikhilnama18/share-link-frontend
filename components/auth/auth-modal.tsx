"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import type { AuthView } from "@/components/auth/auth-types";
import { emailPattern } from "@/components/auth/auth-validation";

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
