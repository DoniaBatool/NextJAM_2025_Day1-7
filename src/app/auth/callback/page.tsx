"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Wait a bit for auth state to update
    const timer = setTimeout(() => {
      if (user) {
        router.push('/');
      } else {
        router.push('/auth?error=authentication_failed');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}

