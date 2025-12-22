
import { sanityFetch } from '@/sanity/lib/fetch';
import { ProductCardE } from './productCard';
import { ceramicsFour } from '@/sanity/lib/queries';
import { Product } from '@/sanity/lib/types';
import Link from 'next/link';

export default async function Ceramics() {
  const products: Product[] = await sanityFetch({ query: ceramicsFour });

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-[100px]">
      <div className="mt-[50px] mb-[20px]">
        <p className="text-[32px] text-mytext font-clash">New ceramics</p>
      </div>

      {/* Product cards container */}
      <div className="grid grid-cols-2 md:grid-cols-4  gap-5 mb-[200px] gap-y-[200px]">
        {products
          .filter((product) => product.category && product.category.name)
          .map((product) => (
            <div key={product._id}>
              <ProductCardE
                image={product.imageUrl}
                proname={product.name}
                proprice={product.price}
                slug={product.slug} category={product.category!.name}               />
            </div>
          ))}
      </div>

      {/* View Collection Button */}
      <div className="flex justify-center">
        <button className="cursor-pointer hover:bg-slate-600 rounded-sm hover:text-white bg-[#F9F9F9]/100 px-[32px] py-[16px] text-mytext font-satoshi text-[16px] leading-[150%] w-full sm:w-[170px] h-[56px]">
         <Link href="/products/Ceramics">View collection</Link> 
        </button>
      </div>
    </section>
  );
}
