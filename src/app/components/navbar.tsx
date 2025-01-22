
"use client";
import { useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Banner from "./Banneridpage";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu

  return (
    <header>
      {/* Topbar */}
      <Banner/>
      {/* Main Navbar */}
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl text-[#22202E] font-clash cursor-pointer">Avion</p>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search Icon (Visible on all devices) */}
          <IoIosSearch size={20} color="#2A254B" className="cursor-pointer hidden md:block" />

          {/* Cart and Avatar (Visible on all devices) */}
          <Link href="/cart">
            <IoCartOutline size={20} color="#2A254B" className="cursor-pointer" />
          </Link>
          <RxAvatar size={20} color="#2A254B" className="cursor-pointer" />

          {/* Hamburger Menu (Visible on Mobile) */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <HiOutlineX size={24} color="#2A254B" />
            ) : (
              <HiOutlineMenu size={24} color="#2A254B" />
            )}
          </button>
        </div>
      </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-[#726E8D]/100 text-base  md:justify-center font-satoshi mb-[50px]">
        <Link href="/">
    <span className="cursor-pointer flex items-center space-x-2">
      <FaHome className="text-lg" />
      
    </span>
  </Link>
        <Link href="/about"><span className="cursor-pointer">About</span></Link>
          <Link href="/products/Plantpots"><span className="cursor-pointer">Plant pots</span></Link>
          <Link href="/products/Ceramics"><span className="cursor-pointer">Ceramics</span></Link>
          <Link href="/products/Tables"><span className="cursor-pointer">Tables</span></Link>
          <Link href="/products/Chairs"><span className="cursor-pointer">Chairs</span></Link>
          <Link href="/products/Sofas"><span className="cursor-pointer">Sofas</span></Link>
          <Link href="/products/Lamps"><span className="cursor-pointer">Lamps</span></Link>
          <Link href="/products/Beds"><span className="cursor-pointer">Beds</span></Link>
          <Link href="/products"><span className="cursor-pointer">All Products</span></Link>
        </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
          <Link href="/">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </li>
            </Link>
            <Link href="/about">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                About
              </li>
            </Link>
            <Link href="/products/Plantpots">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Plant pots
              </li>
            </Link>
            <Link href="/products/Ceramics">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Ceramics
              </li>
            </Link>
            <Link href="/products/Tables">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Tables
              </li>
            </Link>
            <Link href="/products/Chairs">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Chairs
              </li>
            </Link>
            <Link href="/products/Sofas">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Sofas
              </li>
            </Link>
            <Link href="/products/Lamps">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Lamps
              </li>
            </Link>
            <Link href="/products/Beds">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Beds
              </li>
            </Link>
            <Link href="/products">
              <li
                className="text-base font-satoshi text-mytext cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                All Products
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
