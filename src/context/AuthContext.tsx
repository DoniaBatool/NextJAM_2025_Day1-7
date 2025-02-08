"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient"; // Ensure this is the correct path for your supabaseClient

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<AuthError | null>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthError | null>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch session from Supabase on initial load
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      // Set user if session exists
      if (data.session?.user) {
        setUser(data.session.user);
      }
    };

    fetchSession();

    // Subscribe to auth state changes (for session updates)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string): Promise<AuthError | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Login Error:", error.message);
      return error;
    }

    setUser(data.user); // Set the user after successful login
    return null;
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string): Promise<AuthError | null> => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Signup Error:", error.message);
      return error;
    }

    return null;
  };

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    const redirectUrl = process.env.NEXT_PUBLIC_AUTH_API_URL; 
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl, // Ensure this is correct
      },
    });

    if (error) {
      console.error("Error with Google sign-in:", error.message);
    }
  };

  // Sign out the current user
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error.message);
    } else {
      setUser(null); // Clear the user after logging out
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut }}>
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
