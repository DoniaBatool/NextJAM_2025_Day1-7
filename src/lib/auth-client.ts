"use client";
import { createAuthClient } from "better-auth/react";

// Get baseURL - use window.location.origin in browser, fallback to env vars
const getBaseURL = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Server-side: use environment variables or default
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;

