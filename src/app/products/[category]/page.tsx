import  { ProductCardE } from "@/app/components/productCard";
import Topbar from "@/app/components/topbar";
import { sanityFetch } from "@/sanity/lib/fetch"; // Fetch utility import karein
import { Product } from "@/sanity/lib/types";



export const dynamic = "force-dynamic"; // Cache disable karne ke liye

// Sanity query function for products by category
const productsByCategoryQuery = (category: string) => `
*[_type == "product" && category->name == "${category}"]{
  _id,
  name,
  description,
  "slug": slug.current,
  "category": category->{name},
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
}
`;

// Sanity query for fetching all categories
const categoriesQuery = `
*[_type == "product"].category->name
`;

async function getProducts(category: string) {
  return await sanityFetch({
    query: productsByCategoryQuery(category),
  });
}

// Static paths generator for popular categories
export async function generateStaticParams() {
  const categories: string[] = await sanityFetch({
    query: categoriesQuery,
  });

  // Remove duplicates from categories
  const uniqueCategories = [...new Set(categories)];

  // Return paths in the required format
  return uniqueCategories.map((category) => ({
    category,
  }));
}


interface Props {
  params: {
    category: string;
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = params; // URL se category lein
  const products: Product[] = await getProducts(category); // Sanity se products fetch karein

  if (products.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold">No products found in {category}</h1>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-[1440px] mx-auto">
      <Topbar />
      </div>
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-[100px]">
      <div className="mt-[50px] mb-[100px]">
        <p className="text-[32px] text-mytext font-clash">{category} Collection</p>
      </div>

      {/* Product cards container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6  mb-[200px] gap-y-[250px]">
        {products
          .filter((product) => product.category && product.category.name)
          .map((product) => (
            <div key={product._id}>
              <ProductCardE
                image={product.imageUrl}
                proname={product.name}
                proprice={product.price} slug={product.slug} category={product.category!.name}  />
            </div>
          ))}
      </div>

     
    </section>

    </>
  );
};

export default CategoryPage;
