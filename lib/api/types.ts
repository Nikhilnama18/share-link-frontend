export type AuthProvider = "EMAIL" | "GOOGLE";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  plan: string;
  authProvider: AuthProvider;
};

export type AuthResponse = {
  message?: string;
  token?: string;
  user: AuthUser;
};

export type MessageResponse = {
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type ResendOtpRequest = {
  email: string;
};
