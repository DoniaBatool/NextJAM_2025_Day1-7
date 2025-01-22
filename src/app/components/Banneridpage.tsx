"use client";
import { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineX } from "react-icons/hi";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-0 h-[41px] text-wrap sm:text-nowrap flex items-center bg-mytext text-white font-satoshi text-sm">
          {/* Delivery Icon and Centered Text */}
          <div className="absolute left-0 right-12 flex justify-center items-center gap-2 px-4 sm:px-0">
            <TbTruckDelivery size={16} color="white" />
            <span className=" text-left sm:text-center">
              Free delivery on all orders over £50 with code easter checkout
            </span>
          </div>

          {/* Close Icon */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 focus:outline-none"
            aria-label="Close banner"
          >
            <HiOutlineX size={20} color="white" />
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
