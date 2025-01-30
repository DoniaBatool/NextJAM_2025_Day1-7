'use client';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import Link from 'next/link';
import Divider from './divider';
import { sanityFetch } from '@/sanity/lib/fetch';
import { searchProducts } from '@/sanity/lib/queries';
import { Product } from '@/sanity/lib/types';

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search
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
    <div>
      {/* Topbar */}
      <div className="flex flex-wrap justify-between items-center px-4 py-4 max-w-[1386px] mx-auto relative">
        
        {/* Logo (Centered on larger screens) */}
        <div className="w-full md:w-auto flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <Link href="/">
            <p className="text-[24px] text-[#22202E] font-clash cursor-pointer">
              Avion
            </p>
          </Link>
        </div>

        {/* Hamburger Menu (Visible on <=768px screens) */}
        <div className="absolute right-4 top-4 md:hidden">
          {menuOpen ? (
            <HiOutlineX
              size={24}
              color="#2A254B"
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <HiOutlineMenu
              size={24}
              color="#2A254B"
              className="cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Search Bar (Moves to the next row below 550px) */}
        <div className="w-full flex justify-center md:w-auto mt-3 md:mt-0">
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
            {/* Search icon inside input field */}
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
            {/* Dropdown for search results */}
            {searchTerm && !loading && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-11 bg-white shadow-lg mt-2 max-h-60 overflow-y-auto z-50">
                <ul>
                  {searchResults.map((product) => (
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
        </div>

        {/* Right Section (Cart & Avatar) - Shown on screens >= 768px */}
        <div className="hidden md:flex gap-5 items-center">
          <Link href="/cart">
            <IoCartOutline size={20} color="#2A254B" className="cursor-pointer" />
          </Link>
          <RxAvatar size={20} color="#2A254B" className="cursor-pointer" />
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Navbar (Hidden on Mobile, Visible on Desktop) */}
      <nav className="hidden md:block relative w-full max-w-[675px] mx-auto my-5">
        <ul className="flex justify-between text-[#726E8D]/100 text-[16px] font-satoshi">
          <Link href="/"><li>Home</li></Link>
          <Link href="/about"><li>About</li></Link>
          <Link href="/products/Plantpots"><li>Plant pots</li></Link>
          <Link href="/products/Ceramics"><li>Ceramics</li></Link>
          <Link href="/products/Tables"><li>Tables</li></Link>
          <Link href="/products/Chairs"><li>Chairs</li></Link>
          <Link href="/products/Sofas"><li>Sofas</li></Link>
          <Link href="/products/Lamps"><li>Lamps</li></Link>
          <Link href="/products/Beds"><li>Beds</li></Link>
          <Link href="/products"><li>All Products</li></Link>
        </ul>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-100 px-5 py-4">
          <ul className="flex flex-col gap-4 text-[#726E8D]/100 text-[16px] font-satoshi">
            <Link href="/"><li onClick={() => setMenuOpen(false)}>Home</li></Link>
            <Link href="/about"><li onClick={() => setMenuOpen(false)}>About</li></Link>
            <Link href="/products/Plantpots"><li onClick={() => setMenuOpen(false)}>Plant pots</li></Link>
            <Link href="/products/Ceramics"><li onClick={() => setMenuOpen(false)}>Ceramics</li></Link>
            <Link href="/products/Tables"><li onClick={() => setMenuOpen(false)}>Tables</li></Link>
            <Link href="/products/Chairs"><li onClick={() => setMenuOpen(false)}>Chairs</li></Link>
            <Link href="/products/Sofas"><li onClick={() => setMenuOpen(false)}>Sofas</li></Link>
            <Link href="/products/Lamps"><li onClick={() => setMenuOpen(false)}>Lamps</li></Link>
            <Link href="/products/Beds"><li onClick={() => setMenuOpen(false)}>Beds</li></Link>
            <Link href="/products"><li onClick={() => setMenuOpen(false)}>All Products</li></Link>
            <Link href="/cart">
            <li onClick={() => setMenuOpen(false)}><IoCartOutline size={20} color="#2A254B" className="cursor-pointer" />
            </li>
          </Link>
          <Link href="/cart">
            <li onClick={() => setMenuOpen(false)}>
            <RxAvatar size={20} color="#2A254B" className="cursor-pointer" />
            </li>
          </Link>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Topbar;
