'use client';
import { useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Banner from "./Banneridpage";
import { FaHome } from "react-icons/fa";
import { Product } from "@/sanity/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { searchProducts } from "@/sanity/lib/queries";
import { AuthProvider } from "@/context/AuthContext";
import Avatar from "./Avatar";
import Toast from "./Toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setLoading(true);
    try {
      if (e.target.value.trim() !== '') {
        const results: Product[] = await sanityFetch({
          query: searchProducts,
          params: { searchTerm: `${e.target.value}*` },
        });
        setSearchResults(results);
      } else {
        setSearchResults([]);
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <Link href="/">
            <p className="text-2xl text-[#22202E] font-clash cursor-pointer">
              Avion
            </p>
          </Link>

          {/* Right: Icons (Stay on right side at ≤640px) */}
          <div className="flex items-center gap-5">
         
            <AuthProvider>
            <Toast/>
            <Avatar/>
            </AuthProvider>
          
            {/* Hamburger Menu */}
            <button
              className="md:hidden flex items-center p-2 rounded-md focus:outline-none"
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

        {/* Search Bar (Moves below at smaller screens) */}
        <div className="w-full sm:w-auto mt-3 flex justify-center">
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px]">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <IoIosSearch size={20} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none"
              placeholder="Search Products"
            />
            {searchTerm && !loading && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-11 bg-white shadow-lg mt-2 max-h-60 overflow-y-auto z-50">
                <ul>
                  {searchResults
                    .filter((product) => product.category && product.category.name)
                    .map((product) => (
                      <li
                        key={product._id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Link href={`/products/${product.category!.name}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6 text-[#726E8D]/100 text-base md:justify-center font-satoshi mb-[50px]">
        <Link href="/"><FaHome className="text-lg" /></Link>
        <Link href="/about"><span>About</span></Link>
        <Link href="/products/Plantpots"><span>Plant pots</span></Link>
        <Link href="/products/Ceramics"><span>Ceramics</span></Link>
        <Link href="/products/Tables"><span>Tables</span></Link>
        <Link href="/products/Chairs"><span>Chairs</span></Link>
        <Link href="/products/Sofas"><span>Sofas</span></Link>
        <Link href="/products/Lamps"><span>Lamps</span></Link>
        <Link href="/products/Beds"><span>Beds</span></Link>
        <Link href="/products"><span>All Products</span></Link>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Home</li>
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">About</li>
            </Link>
            <Link href="/products/Plantpots" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Plant pots</li>
            </Link>
            <Link href="/products/Ceramics" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Ceramics</li>
            </Link>
            <Link href="/products/Tables" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Tables</li>
            </Link>
            <Link href="/products/Chairs" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Chairs</li>
            </Link>
            <Link href="/products/Sofas" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Sofas</li>
            </Link>
            <Link href="/products/Lamps" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Lamps</li>
            </Link>
            <Link href="/products/Beds" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">Beds</li>
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>
              <li className="text-base font-satoshi text-mytext">All Products</li>
            </Link>
          
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
