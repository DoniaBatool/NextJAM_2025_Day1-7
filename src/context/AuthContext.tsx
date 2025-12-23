"use client";
import { createContext, useContext, ReactNode } from "react";
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";

interface AuthContextType {
  user: { id: string; email: string; name?: string; image?: string } | null;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        return { error: { message: result.error.message || "Login failed" } };
      }

      return {};
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login";
      return { error: { message: errorMessage } };
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await signUp.email({
        email,
        password,
      });

      if (result.error) {
        return { error: { message: result.error.message || "Signup failed" } };
      }

      return {};
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during signup";
      return { error: { message: errorMessage } };
    }
  };

  // Sign out the current user
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: session?.user || null, 
        signInWithEmail, 
        signUpWithEmail, 
        signOut: handleSignOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
