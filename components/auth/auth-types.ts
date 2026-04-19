export type AuthView = "login" | "signup" | "verify-otp";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};
