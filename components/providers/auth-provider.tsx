"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  resendOtp,
  signup as signupRequest,
  verifyOtp,
} from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import type {
  AuthUser,
  LoginRequest,
  ResendOtpRequest,
  SignupRequest,
  VerifyOtpRequest,
} from "@/lib/api/types";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<AuthUser>;
  signup: (payload: SignupRequest) => Promise<AuthUser>;
  verifySignupOtp: (payload: VerifyOtpRequest) => Promise<void>;
  resendSignupOtp: (payload: ResendOtpRequest) => Promise<string>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** AuthProvider stores the visible user profile while auth stays in an HTTP-only cookie. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then(({ user: currentUser }) => {
        if (isMounted) {
          setUser(currentUser);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return;
        }

        console.error("Unable to load current user:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const response = await loginRequest(payload);
    setUser(response.user);
    return response.user;
  }, []);

  const signup = useCallback(async (payload: SignupRequest) => {
    const response = await signupRequest(payload);
    setUser(response.user);
    return response.user;
  }, []);

  const verifySignupOtp = useCallback(async (payload: VerifyOtpRequest) => {
    await verifyOtp(payload);
    setUser((currentUser) =>
      currentUser && currentUser.email === payload.email
        ? { ...currentUser, isEmailVerified: true }
        : currentUser,
    );
  }, []);

  const resendSignupOtp = useCallback(async (payload: ResendOtpRequest) => {
    const response = await resendOtp(payload);
    return response.message;
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      verifySignupOtp,
      resendSignupOtp,
      logout,
    }),
    [isLoading, login, logout, resendSignupOtp, signup, user, verifySignupOtp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** useAuth exposes the current auth session and auth actions. */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
