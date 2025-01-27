import { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity/lib/types";
import Image from "next/image";

// Define the type for price range
type PriceRange = {
  label: string;
  minPrice: number;
  maxPrice: number;
};

type DropdownState = {
  prices: boolean;
};

const PriceFilterComponent = () => {
  const [dropdown, setDropdown] = useState<DropdownState>({ prices: false });
  const [products, setProducts] = useState<Product[]>([]);

  // Toggle dropdown visibility
  const toggleDropdown = (key: keyof DropdownState) => {
    setDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle filtering directly with Sanity query
  const handlePriceFilter = async (minPrice: number, maxPrice: number) => {
    try {
      // Sanity GROQ Query
      const query = `
        *[_type == "product" && price >= $minPrice && price <= $maxPrice] {
          _id,
          name,
          description,
          price,
          slug,
          category->{name},
          image,
          features,
          tags
        }
      `;

      // Fetch data directly with Sanity client
      const filteredProducts: Product[] = await client.fetch(query, {
        minPrice,
        maxPrice,
      });

      // Update state with filtered products
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      {/* Price Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("prices")}
          className="flex items-center px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] gap-1 text-center bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Filter <RiArrowDropDownFill />
        </button>
        {dropdown.prices && (
          <ul className="absolute left-0 bg-white border shadow-lg rounded-md py-2 mt-2 z-50 min-w-[200px]">
            {[
              { label: "0-100 Pounds", minPrice: 0, maxPrice: 100 },
              { label: "100-500 Pounds", minPrice: 100, maxPrice: 500 },
              { label: "500-1000 Pounds", minPrice: 500, maxPrice: 1000 },
            ].map((range: PriceRange) => (
              <li
                key={range.label}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePriceFilter(range.minPrice, range.maxPrice)}
              >
                {range.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filtered Products */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Filtered Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="border rounded-md p-4 hover:shadow-lg transition"
              >
                <Image
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
            <p>No products found for the selected price range.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceFilterComponent;
