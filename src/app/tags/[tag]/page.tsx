import ProductCardT from "@/app/components/productCard";
import Topbar from "@/app/components/topbar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Product } from "@/sanity/lib/types";

export const dynamic = "force-dynamic"; // Disable caching

// Query to fetch products by tag
const productsByTagQuery = (tag: string) => `
*[_type == "product" && "${tag}" in tags]{
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

// Fetch products based on tag
async function getProductsByTag(tag: string) {
  return await sanityFetch({
    query: productsByTagQuery(tag),
  });
}

interface Props {
  params: {
    tag: string;
  };
}

const TagPage = async ({ params }: Props) => {
 // Get the tag from the URL
  const tag = decodeURIComponent(params.tag); 
  const products: Product[] = await getProductsByTag(tag); // Fetch products for the tag

  if (products.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold">No products found for tag: {tag}</h1>
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
          <p className="text-[32px] text-mytext font-clash">{tag} Collection</p>
        </div>

        {/* Product cards container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6  mb-[200px] gap-y-[250px]">
          {products
            .filter((product) => product.category && product.category.name)
            .map((product) => (
              <div key={product._id}>
                <ProductCardT
                  image={product.imageUrl}
                  proname={product.name}
                  proprice={product.price}
                  slug={product.slug}
                  category={product.category!.name}
                  tag={tag}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default TagPage;
