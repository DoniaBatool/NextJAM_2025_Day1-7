
import CartActions from "@/app/components/CartAction";
import ProductCategory from "@/app/components/categoryFetch";
import Club from "@/app/components/club";
import Feature from "@/app/components/feature";
import Navbar from "@/app/components/navbar";
import ReviewSection from "@/app/components/Review";
import { AuthProvider } from "@/context/AuthContext";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Product } from "@/sanity/lib/types";
import Image from "next/image";




// Sanity Query
const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
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
    query: productBySlugQuery,
    params: { slug },
  });
}


interface Props {
  params: Promise<{
    slug: string;
    category: string;
  }>;
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
  const { slug } = await params; // URL se slug lein
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

        {product.imageUrl && (
          <div className="w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={721}
              height={759}
              className="mx-auto w-[721px]  md:h-[600px] lg:h-[700px]"
            />
          </div>
        )}

        {/* Right div (Product details) */}
        <div className="w-full md:ml-[30px] lg:ml-[60px]  flex flex-col gap-[20px] lg:gap-[30px]  px-6">

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

            {product.features && product.features.length > 0 && (
              <div className="w-full md:w-1/2 ml-5 mt-[10px]">
                <ul className="text-[16px] font-satoshi text-[#505977]">
                  {product.features.map((feature, index) => (
                    <li className="list-disc" key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Product Dimensions */}
            {product.dimensions && (
              <div className="flex flex-col gap-[30px] mt-[20px]">
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
                      <li>{product.dimensions.height || "N/A"}</li>
                      <li>{product.dimensions.width || "N/A"}</li>
                      <li>{product.dimensions.depth || "N/A"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

           {/* Cart Actions */}
           <AuthProvider>
           <CartActions
              productId={product._id}
              productName={product.name}
              productPrice={product.price}
              initialStock={product.quantity}
              productImage={product.imageUrl}
              productDescription={product.description}  />
            </AuthProvider>
          </div>
         
        </div>
        
      </div>
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 ">
        <div className="mt-[50px] mb-[20px]">
       <AuthProvider><ReviewSection productId={product._id} /></AuthProvider> 
          <p className="text-[32px] text-mytext font-clash  text-left
           lg:text-left sm:text-center">You might also like</p>
        </div>
      </div>

      
      
           
           {product.category && product.category.name && (
             <ProductCategory
               category={product.category.name}
               currentProductId={product._id}
             />
           )}
           


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
