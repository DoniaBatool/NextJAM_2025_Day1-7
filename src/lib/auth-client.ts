"use client";
import { createAuthClient } from "better-auth/react";

// Get baseURL - use window.location.origin in browser, fallback to env vars
const getBaseURL = (): string => {
  // Client-side: always use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Server-side fallback (shouldn't happen in client component, but for type safety)
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;

