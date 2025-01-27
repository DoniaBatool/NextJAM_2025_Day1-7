'use client';
import { useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Banner from "./Banneridpage";
import { FaHome } from "react-icons/fa";
import { Product } from "@/sanity/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { searchProducts } from "@/sanity/lib/queries";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // state to hold search term
  const [loading, setLoading] = useState(false); // state for loading spinner
  const [searchResults, setSearchResults] = useState<Product[]>([]); // state to hold search results

  // Fetch products based on category
 const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
     setSearchTerm(e.target.value); // Update the search term
     setLoading(true);
     try {
       if (e.target.value.trim() !== '') {
         const results: Product[] = await sanityFetch({
           query: searchProducts,
           params: { searchTerm: `${e.target.value}*` }, // Use wildcard match for more flexibility
         });
         setSearchResults(results); // Ensure results are typed as Product[]
       } else {
         setSearchResults([]); // Reset results when the search term is empty
       }
     } catch (error) {
       console.error('Error fetching search results:', error);
     }
     setLoading(false);
   };
 

  return (
    <header>
      {/* Topbar */}
      <Banner />
      {/* Main Navbar */}
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl text-[#22202E] font-clash cursor-pointer">Avion</p>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search Bar (Visible on all devices) */}
          <div className="relative flex items-center">
            <IoIosSearch
              size={20}
              color="#2A254B"
              className="absolute left-2 cursor-pointer"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none"
              placeholder="Search Products"
            />
            {/* Dropdown for search results */}
            {searchTerm && !loading && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-11 bg-white shadow-lg mt-2 max-h-60 overflow-y-auto z-100">
                <ul>
                  {searchResults.map((product: Product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link href={`/products/${product.category.name}`}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

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
      <nav className="hidden md:flex space-x-6 text-[#726E8D]/100 text-base md:justify-center font-satoshi mb-[50px]">
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
            {/* Add other mobile links here */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
