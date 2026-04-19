"use client";

import { ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const OTP_LENGTH = 6;

/** OtpVerificationForm collects the email verification code after signup. */
export function OtpVerificationForm({
  email,
  error,
  resendMessage,
  isResending,
  isSubmitting,
  onBack,
  onResend,
  onSubmit,
}: {
  email: string;
  error?: string;
  resendMessage?: string;
  isResending?: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onResend: () => void;
  onSubmit: (otp: string) => void;
}) {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = otpDigits.join("");
  const isOtpDisabled = !/^\d{6}$/.test(otp);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateDigits = (nextDigits: string[]) => {
    setOtpDigits(nextDigits);
  };

  const handleDigitChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH - index).split("");

    if (!digits.length) {
      const nextDigits = [...otpDigits];
      nextDigits[index] = "";
      updateDigits(nextDigits);
      return;
    }

    const nextDigits = [...otpDigits];
    digits.forEach((digit, offset) => {
      nextDigits[index + offset] = digit;
    });
    updateDigits(nextDigits);
    focusInput(Math.min(index + digits.length, OTP_LENGTH - 1));
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      focusInput(index - 1);
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!pastedDigits.length) {
      return;
    }

    event.preventDefault();
    const nextDigits = Array(OTP_LENGTH).fill("");
    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    updateDigits(nextDigits);
    focusInput(Math.min(pastedDigits.length, OTP_LENGTH - 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(otp);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-semibold tracking-normal">
          Verify your email
        </DialogTitle>
        <DialogDescription className="text-center">
          Enter the 6-digit code sent to {email}.
        </DialogDescription>
      </DialogHeader>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="signup-otp-0">Verification code</Label>
          <div className="grid grid-cols-6 gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                id={index === 0 ? "signup-otp-0" : undefined}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={`Verification code digit ${index + 1}`}
                value={digit}
                maxLength={1}
                onChange={(event) => handleDigitChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                className="h-12 w-full rounded-md border border-input bg-transparent text-center text-lg font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isOtpDisabled || isSubmitting}
          className="h-11 rounded-full bg-[#185f35] text-white hover:bg-[#144f2c]"
        >
          {isSubmitting ? "Verifying..." : "Verify email"}
        </Button>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </form>

      {resendMessage ? (
        <p className="text-center text-sm text-muted-foreground">{resendMessage}</p>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Use a different email
        </button>
        <button
          type="button"
          disabled={isResending}
          onClick={onResend}
          className="font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </>
  );
}
