"use client";
import { RxAvatar } from "react-icons/rx";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

const Avatar = () => {
  const { user, signOut } = useAuth();

  // Loading state jab tak user ka data fetch ho raha ho
  if (user === undefined) {
    return <div className="animate-pulse w-8 h-8 bg-gray-300 rounded-full"></div>;
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 cursor-pointer" onClick={signOut}>
          {user.image ? (
            <Image
              src={user.image}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <RxAvatar size={30} color="#2A254B" />
          )}
          <span className="text-sm">Logout</span>
        </div>
      ) : (
        <Link href="/auth" className="flex items-center gap-2 cursor-pointer">
          <RxAvatar size={30} color="#2A254B" />
          <span className="text-sm">Login</span>
        </Link>
      )}
    </div>
  );
};

export default Avatar;

