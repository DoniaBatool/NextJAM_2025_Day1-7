"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Correct icons for password visibility
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
  
    if (isSignUp) {
      const error = await signUpWithEmail(email, password);
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("A confirmation email has been sent to you. Please verify your email and then login.");
      }
    } else {
      const error = await signInWithEmail(email, password);
      if (error) {
        // Check if error is due to invalid credentials
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage("You are not registered. Please sign up first!");
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } else {
        setSuccessMessage("Logged in successfully!");
        router.push("/");
      }
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
          className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>

      <hr className="my-6 w-80" />

      <button
        onClick={signInWithGoogle}
        className="bg-black text-white p-3 rounded-lg mt-4 flex items-center gap-2 hover:bg-slate-800 
        transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
          <path fill="#4285F4" d="M44.5 20H24v8.5h11.9C34 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.8 1.1 8 3l6-6C34.8 4 29.7 2 24 2 11.3 2 1 12.3 1 25s10.3 23 23 23c11.5 0 21.1-8.3 22.8-19H44.5z" />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
