
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { ProductCardE } from '../components/productCard';
import Topbar from '../components/topbar';
import { eightproducts, allproducts, allproductsByPrice, allproductsSortedBy } from '@/sanity/lib/queries';
import { Product } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/fetch';

export default function Productspage() {
  const [products, setProducts] = useState<Product[]>([]); // Store fetched products
  const [isShowingAllProducts, setIsShowingAllProducts] = useState(false); // State toggle
  const [dropdown, setDropdown] = useState<{ [key: string]: boolean }>({
    categories: false,
    tags: false,
    prices: false,
    sorting: false,
  }); // Dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial 8 products
  useEffect(() => {
    const fetchInitialProducts = async () => {
      const initialData: Product[] = await sanityFetch({ query: eightproducts });
      setProducts(initialData);
    };
    fetchInitialProducts();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown({
          categories: false,
          tags: false,
          prices: false,
          sorting: false,
        });
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Fetch all products on button click
  const handleViewCollection = async () => {
    if (!isShowingAllProducts) {
      const allData: Product[] = await sanityFetch({ query: allproducts });
      setProducts(allData);
      setIsShowingAllProducts(true);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = (menu: string) => {
    setDropdown((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Fetch products based on price range
  const handlePriceFilter = async (minPrice: number, maxPrice: number) => {
    try {
      const filteredProducts: Product[] = await sanityFetch({
        query: allproductsByPrice,
        params: { minPrice, maxPrice }, // Pass price range as params
      });

      setProducts(filteredProducts); // Update products state
      setDropdown((prev) => ({ ...prev, prices: false })); // Close dropdown
    } catch (error) {
      console.error('Error fetching products by price range:', error);
    }
  };

  // Handle Sort by Price
  const handleSort = async (sortOrder: 'asc' | 'desc') => { // Ensure sortOrder is strictly 'asc' | 'desc'
    try {
      const sortedProducts: Product[] = await sanityFetch({
        query: allproductsSortedBy,
        params: { sortOrder }, // Pass sortOrder as parameter
      });

      setProducts(sortedProducts);
      setDropdown((prev) => ({ ...prev, sorting: false })); // Close dropdown
    } catch (error) {
      console.error('Error fetching sorted products:', error);
    }
  };

  const sortOptions = [
    { label: 'Price: Low to High', sortOrder: 'asc' } as const,  // Ensure the type is 'asc'
    { label: 'Price: High to Low', sortOrder: 'desc'} as const,  // Ensure the type is 'desc'
  ];

  // Categories and Tags Data
  const categories = ['Lamps', 'Beds', 'Sofas', 'Tables', 'Ceramics', 'Plantpots', 'Chairs'];
  const tags = ['Luxury', 'New Arrival', 'Antique', 'Modern', 'Decor', 'Popular Products', 'Comfy'];
  const priceRanges = [
    { label: '0-100 Pounds', minPrice: 0, maxPrice: 100 },
    { label: '100-500 Pounds', minPrice: 100, maxPrice: 500 },
    { label: '500-1000 Pounds', minPrice: 500, maxPrice: 1000 },
  ];
  
  return (
    <div className="max-w-[1440px] mx-auto" ref={dropdownRef}>
      <Topbar />
      <Image src="/products/Frame.png" alt="frame" width={1440} height={209} className="w-full" />

      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8 gap-y-4 mt-8">
        <div className="flex flex-wrap gap-4 sm:gap-[12px] font-satoshi text-mytext text-[14px] sm:text-[16px] leading-[150%]">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('categories')}
              className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Category <RiArrowDropDownFill />
            </button>
            {dropdown.categories && (
              <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link href={`/products/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Product Tags Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('tags')}
              className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Product Tags <RiArrowDropDownFill />
            </button>
            {dropdown.tags && (
              <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('prices')}
              className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Filter <RiArrowDropDownFill />
            </button>
            {dropdown.prices && (
              <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
                {priceRanges.map((price) => (
                  <li
                    key={price.label}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePriceFilter(price.minPrice, price.maxPrice)}
                  >
                    {price.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sorting')}
              className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Sort <RiArrowDropDownFill />
            </button>
            {dropdown.sorting && (
              <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
                {sortOptions.map(({ label, sortOrder }) => (
                  <li
                    key={label}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort(sortOrder)} // Pass correct sortOrder
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 mb-[200px] mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-[200px] gap-y-[200px]">
          {products.map((product: Product) => (
            <div key={product._id}>
              <ProductCardE
                image={product.imageUrl}
                proname={product.name}
                proprice={product.price}
                slug={product.slug}
                category={product.category.name}
              />
            </div>
          ))}
        </div>

        {/* View Collection Button */}
        {!isShowingAllProducts && (
          <div className="flex justify-center pb-8 pt-10">
            <button
              onClick={handleViewCollection}
              className="border-2 border-myblack text-myblack rounded-md py-2 px-6 hover:bg-black hover:text-white"
            >
              View full collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



