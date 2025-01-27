import { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity/lib/types";

const SortingComponent = () => {
  const [dropdown, setDropdown] = useState({ sorting: false });
  const [products, setProducts] = useState<Product[]>([]);

  // Toggle dropdown visibility
  const toggleDropdown = (key: keyof typeof dropdown) => {
    setDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle sorting with Sanity query
  const handleSort = async (sortOrder: "asc" | "desc") => {
    try {
      // GROQ query to fetch sorted products
      const query = `
        *[_type == "product"] | order(price ${sortOrder}) {
          _id,
          name,
          price,
          slug,
          "imageUrl": image.asset->url,
          category->{
            name
          }
        }
      `;

      // Fetch sorted products using Sanity client
      const sortedProducts: Product[] = await client.fetch(query);

      // Update state with sorted products
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching sorted products:", error);
    }
  };

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("sorting")}
          className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Sort <RiArrowDropDownFill />
        </button>
        {dropdown.sorting && (
          <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
            {[
              { label: "Price: Low to High", sortOrder: "asc" as const },
              { label: "Price: High to Low", sortOrder: "desc" as const },
            ].map(({ label, sortOrder }) => (
              <li
                key={label}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSort(sortOrder)}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sorted Products */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Sorted Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="border rounded-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.category?.name}</p>
                <p className="font-bold text-blue-600 mt-2">£{product.price}</p>
              </div>
            ))
          ) : (
            <p>No products found for the selected sorting order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingComponent;
