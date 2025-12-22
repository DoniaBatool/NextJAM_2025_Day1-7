"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Correct icons for password visibility
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for error in URL params (from OAuth callback)
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      if (error === 'authentication_failed') {
        setErrorMessage("Authentication failed. Please try again.");
      } else if (error === 'configuration') {
        setErrorMessage("Configuration error. Please contact support.");
      } else {
        setErrorMessage("An error occurred during authentication.");
      }
      // Clean URL
      router.replace('/auth');
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
  
    try {
      if (isSignUp) {
        const result = await signUpWithEmail(email, password);
        if (result.error) {
          setErrorMessage(result.error.message);
        } else {
          setSuccessMessage("Account created successfully! You can now login.");
          // Clear form after successful signup
          setEmail("");
          setPassword("");
          setIsSignUp(false);
        }
      } else {
        const result = await signInWithEmail(email, password);
        if (result.error) {
          // Check if error is due to invalid credentials
          const errorMsg = result.error.message.toLowerCase();
          if (errorMsg.includes("invalid") || errorMsg.includes("credentials")) {
            setErrorMessage("Invalid email or password. Please try again.");
          } else {
            setErrorMessage(result.error.message || "Login failed. Please check your credentials.");
          }
        } else {
          setSuccessMessage("Logged in successfully!");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch (error: any) {
      setErrorMessage(error?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h1>

      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded  mb-4 text-center">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded  mb-4 text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>

    </div>
  );
}
