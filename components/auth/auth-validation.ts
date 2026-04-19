import { useMemo } from "react";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasLetterPattern = /[a-zA-Z]/;
const hasNumberPattern = /\d/;

/** useEmailError returns a delayed validation error for email fields. */
export function useEmailError(email: string, shouldShowEmailError: boolean) {
  return useMemo(() => {
    if (!shouldShowEmailError || !email || emailPattern.test(email)) {
      return "";
    }

    return "Enter a valid email address.";
  }, [email, shouldShowEmailError]);
}

/** useSignupPasswordError returns a delayed validation error for signup passwords. */
export function useSignupPasswordError(password: string, hasTouchedPassword: boolean) {
  return useMemo(() => {
    if (!hasTouchedPassword) {
      return "";
    }

    return getSignupPasswordError(password);
  }, [password, hasTouchedPassword]);
}

/** getSignupPasswordError validates the minimum password requirements. */
export function getSignupPasswordError(password: string) {
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
