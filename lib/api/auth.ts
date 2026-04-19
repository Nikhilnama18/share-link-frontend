import { apiRequest } from "@/lib/api/client";
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  MessageResponse,
  ResendOtpRequest,
  SignupRequest,
  VerifyOtpRequest,
} from "@/lib/api/types";

/** login creates an HTTP-only auth cookie through the backend. */
export function login(payload: LoginRequest) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** signup creates an account and starts email OTP verification. */
export function signup(payload: SignupRequest) {
  return apiRequest<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** verifyOtp verifies the signup email code. */
export function verifyOtp(payload: VerifyOtpRequest) {
  return apiRequest<MessageResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** resendOtp replaces the existing signup verification code with a new one. */
export function resendOtp(payload: ResendOtpRequest) {
  return apiRequest<MessageResponse>("/api/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** getCurrentUser loads the current user from the HTTP-only cookie. */
export function getCurrentUser() {
  return apiRequest<{ user: AuthUser }>("/api/auth/me");
}

/** logout clears the backend auth cookie. */
export function logout() {
  return apiRequest<MessageResponse>("/api/auth/logout", {
    method: "POST",
  });
}
