import { chairs, sofa } from '@/sanity/lib/queries';
import { ProductCard2, ProductCardE } from './productCard';
import { Product } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/fetch';
import Link from 'next/link';



export default async function PopularProducts () {

  const product:Product =await sanityFetch({query:sofa})
  const products:Product[] =await sanityFetch({query:chairs})
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-[100px]">
      <div className="mt-[50px] mb-[20px]">
        <p className="text-[32px] text-mytext font-clash">Our popular products</p>
      </div>

      {/* CSS Grid container for the product items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-[150px]">
        {/* Product 1 (sofa image takes up full width on mobile and smaller screens, 2 columns on larger screens) */}
       {
        <div className="col-span-2 pb-[170px] ">
          <ProductCard2
              image={product.imageUrl}
              proname={product.name}
              proprice={product.price} slug={product.slug} category={product.category.name}               />
        </div>
}
      
      
        {
          
          products.map ((product) => (
              <div key={product._id} >
        <ProductCardE
              image={product.imageUrl}
              proname={product.name}
              proprice={product.price} slug={product.slug} category={product.category.name} /> 
              </div>

      ))
      
      
      }

        </div>
      
      {/* View Collection Button */}
      <div className="flex justify-center mb-[20px]">
        <button className="cursor-pointer bg-[#F9F9F9]/100 mt-[100px] px-[32px] py-[16px] rounded-sm hover:text-white hover:bg-slate-600 text-mytext font-satoshi text-[16px] leading-[150%] w-full sm:w-[170px] h-[56px]">
          <Link href={"/tags/popular products"}>View collection</Link>
        </button>
      </div>
    </section>
  );
};

