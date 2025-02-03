"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getStockAction } from "../Actions/cartActions";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface CartActionsProps {
  productId: string;
  productName: string;
  productPrice: number;
  initialStock: number;
  productImage: string;
  productDescription: string;
}

const CartActions = ({
  productId,
  productName,
  productPrice,
  initialStock,
  productImage,
  productDescription,
}: CartActionsProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const { addToCart } = useCart();
  const [stock, setStock] = useState(initialStock);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState(productPrice);
  const [checkedOptions, setCheckedOptions] = useState({
    customize: false,
    renovate: false,
    purchase: true, // Default to Purchase being selected
  });

  const fetchStock = useCallback(async () => {
    try {
      const stockData = await getStockAction(productId);
      setStock(stockData);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  }, [productId]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      e.preventDefault(); // ✅ Stop Link navigation
      alert("You must be logged in to access the cart!");
      router.push("/auth"); // ✅ Redirect to login page
    }
  };
  const handleCheckboxChange = (option: "customize" | "renovate" | "purchase") => {
    setCheckedOptions(() => {
      const updatedOptions = {
        customize: false,
        renovate: false,
        purchase: false,
        [option]: true, // Ensure only the selected option is checked
      };
  
      // Handle price adjustments and alerts
      if (option === "renovate") {
        alert("Our team will soon contact you for further details.");
        setDiscountedPrice(productPrice * 0.75);
      } else if (option === "customize") {
        alert("Our team will soon contact you for further details.");
        setDiscountedPrice(productPrice * 1.05);
      } else {
        setDiscountedPrice(productPrice); // Reset to original price for "purchase"
      }
  
      return updatedOptions;
    });
  };
  
  const { stocks } = useCart();

useEffect(() => {
  const updatedStock = stocks.find((s) => s.productId === productId)?.stock;
  if (updatedStock !== undefined) {
    setStock(updatedStock);
  }
}, [stocks, productId]);


  const increment = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setMessage(null);
    } else {
      setMessage("Sorry, stock is unavailable.");
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      const selectedService = checkedOptions.customize
        ? "Customize"
        : checkedOptions.renovate
        ? "Renovate"
        : "Purchase";
  
      addToCart({
        productId,
        productName,
        productPrice: discountedPrice,
        quantity,
        productImage,
        productDescription,
        stock,
        isRenovate: checkedOptions.renovate,
        serviceType: selectedService,
      });
  
      alert("Item successfully added to cart!");
      setQuantity(0);
  
      // Wait for the stock to update in Sanity
      await new Promise((resolve) => setTimeout(resolve, 500)); // Short delay for API to update
  
      await fetchStock(); // Fetch new stock from API
    } else {
      setMessage("Please select at least one item.");
    }
  };
  

  return (
    <div className="space-y-6 max-w-lg px-2 py-5 bg-white">
      {/* Quantity, Stock and Total Amount in a single row */}
      <div className="flex gap-7 items-center">
        {/* In Stock */}
        <p className="text-xl font-medium">
  {stock > 0 ? (
    <>
      Stock: <span className="text-green-600">{stock}</span>
    </>
  ) : (
    <span className="text-red-600">Out of Stock</span>
  )}
</p>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={increment}
            className="w-10 h-10 bg-black text-white rounded-lg transition"
          >
            +
          </button>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            max={stock}
            className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={decrement}
            className="w-10 h-10 bg-black text-white rounded-lg transition"
          >
            -
          </button>
        </div>

        
      </div>
      {/* Total Amount */}
      <p className="text-xl font-medium ">
          Amount: <span className="text-green-600">£{discountedPrice * quantity}</span>
        </p>
      {message && <p className="text-red-500 text-center">{message}</p>}

      {/* Service Options */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Service Options</h3>
        <div className=" flex flex-col xs:flex-row space-x-5  ">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedOptions.customize}
              onChange={() => handleCheckboxChange("customize")}
              className="h-4 w-4"
            />
            <span>Customize</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedOptions.renovate}
              onChange={() => handleCheckboxChange("renovate")}
              className="h-4 w-4"
            />
            <span>Renovate</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedOptions.purchase}
              onChange={() => handleCheckboxChange("purchase")}
              className="h-4 w-4"
            />
            <span>Purchase</span>
          </label>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex  space-x-4">
        <button
          className="py-2 px-4  mb-4 bg-blue-950 text-nowrap text-white rounded-md transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <Link href="/cart">
          <button onClick={handleCart} className="flex-1 py-2 px-4 text-nowrap bg-blue-950 text-white rounded-md transition">
            Go to Cart
          </button>
        </Link>
</div>

    </div>
  );
};

export default CartActions;