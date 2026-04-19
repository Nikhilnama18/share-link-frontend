"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { OtpVerificationForm } from "@/components/auth/otp-verification-form";
import { SignupForm } from "@/components/auth/signup-form";
import type { AuthView, LoginFormValues, SignupFormValues } from "@/components/auth/auth-types";
import { emailPattern } from "@/components/auth/auth-validation";
import { useAuth } from "@/components/providers/auth-provider";
import { ApiError } from "@/lib/api/client";

const getAuthErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

/** AuthModal renders the login/signup entry modal from the header CTA. */
export function AuthModal() {
  const { isLoading, login, logout, resendSignupOtp, signup, user, verifySignupOtp } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const resetRequestState = () => {
    setError("");
    setResendMessage("");
    setIsSubmitting(false);
    setIsResending(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    resetRequestState();

    if (nextOpen && user && !user.isEmailVerified) {
      setPendingVerificationEmail(user.email);
      setEmail(user.email);
      setView("verify-otp");
    }

    setIsOpen(nextOpen);
  };

  /** Switches auth views while carrying forward only valid email addresses. */
  const switchView = (nextView: AuthView) => {
    setError("");
    setResendMessage("");

    if (email && !emailPattern.test(email)) {
      setEmail("");
    }

    setView(nextView);
  };

  const handleLogin = async (values: LoginFormValues) => {
    setError("");
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(values);

      if (!loggedInUser.isEmailVerified) {
        setPendingVerificationEmail(loggedInUser.email);
        setView("verify-otp");
        return;
      }

      setIsOpen(false);
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    setError("");
    setIsSubmitting(true);

    try {
      const signedUpUser = await signup(values);
      setPendingVerificationEmail(signedUpUser.email);
      setEmail(signedUpUser.email);
      setView("verify-otp");
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const verificationEmail = pendingVerificationEmail || email;
    setError("");
    setIsSubmitting(true);

    try {
      await verifySignupOtp({ email: verificationEmail, otp });
      setIsOpen(false);
      setView("login");
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    const verificationEmail = pendingVerificationEmail || email;
    setError("");
    setResendMessage("");
    setIsResending(true);

    try {
      const message = await resendSignupOtp({ email: verificationEmail });
      setResendMessage(message);
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await logout();
      setIsOpen(false);
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user?.isEmailVerified) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden max-w-36 truncate text-sm text-muted-foreground sm:inline">
          {user.name}
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isSubmitting}
          onClick={handleLogout}
          className="rounded-full px-4"
        >
          {isSubmitting ? "Logging out..." : "Log out"}
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          disabled={isLoading}
          className="rounded-full bg-[#1877f2] px-5 text-white shadow-sm hover:bg-[#166fe5]"
        >
          {user && !user.isEmailVerified ? "Verify email" : "Get started"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 sm:rounded-2xl">
        {view === "login" ? (
          <LoginForm
            email={email}
            error={error}
            isSubmitting={isSubmitting}
            onEmailChange={setEmail}
            onSubmit={handleLogin}
            onShowSignup={() => switchView("signup")}
          />
        ) : null}
        {view === "signup" ? (
          <SignupForm
            email={email}
            error={error}
            isSubmitting={isSubmitting}
            onEmailChange={setEmail}
            onSubmit={handleSignup}
            onShowLogin={() => switchView("login")}
          />
        ) : null}
        {view === "verify-otp" ? (
          <OtpVerificationForm
            email={pendingVerificationEmail || email}
            error={error}
            resendMessage={resendMessage}
            isResending={isResending}
            isSubmitting={isSubmitting}
            onBack={() => switchView("signup")}
            onResend={handleResendOtp}
            onSubmit={handleVerifyOtp}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
