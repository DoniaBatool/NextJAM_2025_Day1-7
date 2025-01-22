'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiArrowDropDownFill } from "react-icons/ri";
import { ProductCardE } from '../components/productCard';
import Link from "next/link";
import Topbar from '../components/topbar';
import { eightproducts, allproducts } from '@/sanity/lib/queries';
import { Product } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/fetch';

export default function Productspage() {
  const [products, setProducts] = useState<Product[]>([]); // Store fetched products
  const [isShowingAllProducts, setIsShowingAllProducts] = useState(false); // State toggle

  // Fetch initial 8 products
  useEffect(() => {
    const fetchInitialProducts = async () => {
      const initialData: Product[] = await sanityFetch({ query: eightproducts });
      setProducts(initialData);
    };
    fetchInitialProducts();
  }, []);

  // Fetch all products on button click
  const handleViewCollection = async () => {
    if (!isShowingAllProducts) {
      const allData: Product[] = await sanityFetch({ query: allproducts });
      setProducts(allData);
      setIsShowingAllProducts(true);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto ">
      <Topbar />
      {/* Header Image */}
      <Image
        src="/products/Frame.png"
        alt="frame"
        width={1440}
        height={209}
        className="w-full"
      />

      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8 gap-y-4 mt-8">
        {/* Mobile Filters and Sorting */}
        <div className="flex sm:hidden justify-between gap-4 w-full">
          <button className="bg-gray-100 w-[163px] rounded-sm px-[16px] py-[12px] text-[14px]
           sm:text-[16px] font-satoshi text-mytext flex justify-center place-items-center">
            Filters <RiArrowDropDownFill />
          </button>
          <button className="bg-gray-100 w-[163px] rounded-sm px-[16px] py-[12px] text-[14px] 
          sm:text-[16px] font-satoshi text-mytext flex justify-center items-center">
            Sorting <RiArrowDropDownFill />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex flex-wrap gap-4 sm:gap-[12px] font-satoshi text-mytext text-[14px] sm:text-[16px] leading-[150%]">
          <Link href="/products/1">
            <button className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center">
              Category <RiArrowDropDownFill />
            </button>
          </Link>
          <Link href="/products/1">
            <button className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center">
              Product Tags <RiArrowDropDownFill />
            </button>
          </Link>
          <button className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center">
            Price <RiArrowDropDownFill />
          </button>
          <button className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center">
            Filter <RiArrowDropDownFill />
          </button>
        </div>

        {/* Sorting Options */}
        <div className="hidden  sm:flex flex-wrap  font-satoshi
         text-mytext text-[14px] sm:text-[16px] leading-[150%]">
          <button className="flex items-center mr-[20px] px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center">
            Sorting by <RiArrowDropDownFill />
          </button>
        </div>
      </div>
      <br />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 mb-[200px]">
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-[200px] gap-y-[200px]">
          {products.map((product: Product) => (
            <div key={product._id}>
              <ProductCardE
                image={product.imageUrl}
                proname={product.name}
                proprice={product.price} slug={product.slug} category={product.category.name}              />
            </div>
          ))}
        </div>

        {/* View Collection Button */}
        {!isShowingAllProducts && (
          <div className="flex justify-center pb-4 md:pb-11 mt-4 sm:mt-2 md:mt-0 lg:mt-5">
            <button
              onClick={handleViewCollection}
              className="cursor-pointer bg-[#F9F9F9]/100 px-[32px] py-[16px] rounded-sm hover:bg-slate-600 hover:text-white text-mytext font-satoshi text-[16px] leading-[150%] w-[342px] sm:w-[170px] h-[56px]"
            >
              View collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
