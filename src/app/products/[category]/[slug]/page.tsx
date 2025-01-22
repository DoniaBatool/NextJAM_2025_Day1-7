import ProductCategory from "@/app/components/categoryFetch";
import Club from "@/app/components/club";
import Feature from "@/app/components/feature";
import Navbar from "@/app/components/navbar";
import ReviewSection from "@/app/components/Review";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Product } from "@/sanity/lib/types";
import Image from "next/image";
import Link from "next/link";



// Sanity Query
const productBySlugQuery = (slug: string) => `
*[_type == "product" && slug.current == "${slug}"][0]{
  _id,
  name,
  description,
"category": category->{name},
  "slug": slug.current,
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
}
`;

async function getProduct(slug: string) {
  return await sanityFetch({
    query: productBySlugQuery(slug),
  });
}


interface Props {
  params: {
    slug: string;
    category: string;
    
  };
}

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  const products = await sanityFetch({
    query: `*[_type == "product"]{ "slug": slug.current }`, // Fetch all product slugs
  });

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

const ProductDetailPage = async ({ params }: Props) => {
  const { slug } = params; // URL se slug lein
  const product: Product | null = await getProduct(slug); // Sanity se data fetch karein

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }
  //to fetch products related to the category of the main product on the page
  

  return (

    <main>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-[1440px] w-full mx-auto">

        <div className="w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={721}
            height={759}
            className="mx-auto w-[721px]  md:h-[600px] lg:h-[700px]"
          />
        </div>

        {/* Right div (Product details) */}
        <div className="w-full md:ml-[30px] lg:ml-[60px] lg:mt-[20px] flex flex-col gap-[20px] lg:gap-[50px]  px-6">

          {/* Product Name and Price */}
          <div className="gap-[13px]">
            <p className="text-mytext font-clash text-[36px]">{product.name}</p>
            <p className="text-[24px] font-satoshi text-[#12131A]">£{product.price}</p>
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-[10px]">
            <p className="font-clash text-[16px] text-mytext ">Description</p>
            <p className="text-[16px] font-satoshi text-[#505977]">
              {product.description}
            </p>

            <div className="w-full md:w-1/2 ml-5 mt-[30px]">
             
              

              <ul className="text-[16px] font-satoshi text-[#505977]">
                {product.features.map((feature, index) => (
                  <li className="list-disc" key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            {/* Product Dimensions */}
            <div className="flex flex-col gap-[30px] mt-[30px]">
              <div><p className="font-clash text-[16px] text-mytext">Dimensions</p></div>
              <div className="flex flex-col gap-[12px]">
                <div>
                  <ul className="flex gap-[60px] font-clash text-mytext text-[14px]">
                    <li>Height</li>
                    <li>Width</li>
                    <li>Depth</li>
                  </ul>
                </div>
                <div>
                  <ul className="flex gap-[55px] font-satoshi text-[#505977] text-[16px]">
                    <li>{product.dimensions.height}</li>
                    <li>{product.dimensions.width}</li>
                    <li>{product.dimensions.depth}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Amount and Add to Cart */}
            <div className="flex flex-col xs:flex-row gap-[70px] mt-[40px] sm:gap-[100px] md:gap-[40px] items-center  ">
              <div className="flex gap-[20px] sm:gap-[50px] md:gap-[20px] items-center mb-3 xs:mb-0">
                <p className="font-clash text-[16px] text-mytext">Amount</p>
                <div className="flex gap-[30px] w-[122px] h-[46px] cursor-pointer px-[16px] py-[12px] bg-slate-200 hover:border hover:border-[#4E4D93]">
                  <p className="font-satoshi text-[18px] text-mytext">+</p>
                  <p className="font-satoshi text-[16px] text-mytext">1</p>
                  <p className="font-satoshi text-[18px] text-mytext">-</p>
                </div>
              </div>
              <button className="w-full h-[46px] hover:bg-slate-600 xs:w-[143px] px-[16px] py-[12px] bg-mytext  text-white font-satoshi leading-[150%] text-[16px] border border-[#4E4D93] text-nowrap">
               <Link href="/cart">Add to cart</Link></button>
            </div>
           
          </div>
         
        </div>
        
      </div>
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 ">
        <div className="mt-[50px] mb-[20px]">
        <ReviewSection productId={product._id} />
          <p className="text-[32px] text-mytext font-clash  text-left lg:text-left sm:text-center">You might also like</p>
        </div>
      </div>

      
      
           
           <ProductCategory
          category={product.category.name}
          currentProductId={product._id}
        />
           


      <div className="flex justify-center mt-[250px] mb-[100px]">
        <button className="cursor-pointer bg-[#F9F9F9] text-nowrap rounded-sm hover:text-white hover:bg-slate-600 px-8 py-4 text-mytext font-satoshi text-lg leading-[150%] w-[342px] sm:w-[170px] h-[56px]">
          View collection
        </button>
      </div>

      <div className="max-w-[1280px] mx-auto ">
        <Feature />
      </div>
      <Club />
    </main>
  );
};

export default ProductDetailPage;
