import { sanityFetch } from "@/sanity/lib/fetch";
import { Product } from "@/sanity/lib/types";
import { ProductCardS } from "./productCard";

// Query to fetch related products by category
const relatedProductsQuery = (category: string, currentProductId: string) => `
*[_type == "product" && category->name == "${category}" && _id != "${currentProductId}"][0...4]{
  _id,
  name,
  price,
  "category": category->{name},
  "slug": slug.current,
  "imageUrl": image.asset->url
}
`;

// Fetch related products based on category and exclude current product
async function getRelatedProducts(category: string, currentProductId: string) {
  return await sanityFetch({
    query: relatedProductsQuery(category, currentProductId),
  });
}

interface ProductCategoryProps {
  category: string; // Pass category directly as a prop
  currentProductId: string; // Pass current product ID to exclude it
}

const ProductCategory = async ({ category, currentProductId }: ProductCategoryProps) => {
  // Fetch related products
  const relatedProducts = await getRelatedProducts(category, currentProductId);

  return (
    <div className="max-w-[1280px] mb-[200px] text-nowrap mx-auto px-4 
      gap-x-4 sm:gap-x-10 gap-y-[250px]  md:gap-x-4 md:gap-y-[200px] sm:justify-center sm:place-items-center grid grid-cols-2 md:grid-cols-2 
      lg:grid-cols-4 gap-4">
      {relatedProducts
        .filter((relatedProduct: Product) => relatedProduct.category && relatedProduct.category.name)
        .map((relatedProduct: Product) => (
          <div key={relatedProduct._id}>
            <ProductCardS
              image={relatedProduct.imageUrl}
              proname={relatedProduct.name}
              proprice={relatedProduct.price}
              category={relatedProduct.category!.name}
              slug={relatedProduct.slug}
            />
          </div>
        ))}
    </div>
  );
};

export default ProductCategory;
