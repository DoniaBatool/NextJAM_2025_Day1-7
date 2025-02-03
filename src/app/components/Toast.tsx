'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Toast() {
  const { cart } = useCart();
  const [itemCount, setItemCount] = useState(cart?.length || 0);
  const { user } = useAuth();
  const router = useRouter();


  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      e.preventDefault(); // ✅ Stop Link navigation
      alert("You must be logged in to access the cart.");
      router.push("/auth"); // ✅ Redirect to login page
    }
  };

  useEffect(() => {
    setItemCount(cart.length); // ✅ Fix: Update count when cart changes
  }, [cart]);

  return (
    <div>
      <Link href="/cart" className="relative" >
       <button onClick={handleCart}><IoCartOutline size={20} className="text-[#2A254B] cursor-pointer" /></button> 
        {itemCount > 0 && (
          <span className="absolute -top-3 -left-3  bg-red-500  text-white text-xs rounded-full px-2 py-[2px]">
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  );
}
