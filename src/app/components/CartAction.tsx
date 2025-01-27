"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "./context/CartContext";
import Link from "next/link";

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
  const { addToCart } = useCart();
  const [stock, setStock] = useState(initialStock);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState(productPrice);
  const [checkedOptions, setCheckedOptions] = useState({
    customize: false,
    renovate: false,
  });

  // Memoized fetchStock function to avoid warning
  const fetchStock = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/getStock?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setStock(data.stock); // Update stock based on the backend
      } else {
        console.error("Failed to fetch stock");
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  }, [productId]); // Only depend on productId

  useEffect(() => {
    fetchStock(); // Fetch stock on component mount
  }, [fetchStock]); // Add fetchStock to the dependency array

  // Handle checkbox changes
  const handleCheckboxChange = (option: "customize" | "renovate") => {
    setCheckedOptions((prev) => {
      const updatedOptions = { ...prev, [option]: !prev[option] };

      if (updatedOptions.renovate && !prev.renovate) {
        alert("Our team will soon contact you for further details.");
        setDiscountedPrice((prevPrice) => prevPrice * 0.75); // Deduct 25%
      } else if (!updatedOptions.renovate && prev.renovate) {
        setDiscountedPrice((prevPrice) => prevPrice / 0.75); // Reverse 25% deduction
      }

      if (updatedOptions.customize && !prev.customize) {
        alert("Our team will soon contact you for further details.");
        setDiscountedPrice((prevPrice) => prevPrice * 1.05); // Add 5%
      } else if (!updatedOptions.customize && prev.customize) {
        setDiscountedPrice((prevPrice) => prevPrice / 1.05); // Reverse 5% addition
      }

      return updatedOptions;
    });
  };

  const increment = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setMessage(null);
    } else {
      setMessage("Cannot add more than available stock.");
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setMessage(null);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      setMessage("Quantity must be a positive number.");
      setQuantity(0);
    } else if (value > stock) {
      setMessage("Cannot add more than available stock.");
      setQuantity(stock); // Limit the quantity to stock
    } else {
      setMessage(null);
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (quantity === 0) {
      setMessage("No items in the cart.");
      return;
    }

    // Show success message immediately after clicking "Add to Cart"
    setMessage(`${quantity} item(s) added to the cart successfully.`);

    // Reset quantity and hide the message after 3 seconds
    setQuantity(0);
    setTimeout(() => {
      setMessage(null);
    }, 3000);

    try {
      // Check if "Renovate" is selected
      if (!checkedOptions.renovate) {
        // Deduct stock on the backend only if "Renovate" is not selected
        const response = await fetch(`http://localhost:3000/api/updateStock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantityChange: -quantity,
          }),
        });

        if (!response.ok) {
          setMessage("Failed to update stock. Please try again.");
          return;
        }

        // Fetch the updated stock from the backend after successful update
        await fetchStock();
      }

      // Update local cart
      addToCart({
        productId,
        productName,
        productPrice: discountedPrice,
        quantity,
        productImage,
        productDescription,
        stock,
        isRenovate: true,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const totalPrice = discountedPrice * quantity;

  return (
    <div className="flex flex-col gap-5 mt-4 items-start sm:items-center">
      {/* Stock and Total Price Information */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5 w-full">
        <p
          className={`font-clash text-[16px] ${
            stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </p>

        {/* Total Price */}
        {quantity > 0 && (
          <p className="font-satoshi text-[16px] text-mytext mt-2 sm:mt-0 sm:ml-5">
            Total: ${totalPrice.toFixed(2)}
          </p>
        )}
      </div>

      {/* Service Options */}
      <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md w-full">
        <h3 className="text-lg font-bold text-gray-700">Service Options</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedOptions.customize}
              onChange={() => handleCheckboxChange("customize")}
            />
            Customize (+5%)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedOptions.renovate}
              onChange={() => handleCheckboxChange("renovate")}
            />
            Renovate (-25%)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 w-full">
        {/* Quantity Section */}
        <div className="flex items-center gap-4 px-4 py-2 bg-slate-200 rounded-md">
          <button
            onClick={decrement}
            disabled={quantity === 0}
            className="font-satoshi text-[18px] text-mytext"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center font-satoshi text-[16px] text-mytext border rounded-md"
            min={0}
            max={stock}
          />
          <button
            onClick={increment}
            disabled={quantity >= stock}
            className="font-satoshi text-[18px] text-mytext"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`px-6 py-3 ${
            stock > 0
              ? "bg-mytext text-white hover:bg-slate-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          } font-satoshi text-[16px] rounded-md`}
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          Add to Cart
        </button>
      </div>

      {/* Message Feedback */}
      {message && (
        <p className="text-[14px] font-satoshi text-red-600">{message}</p>
      )}

      {/* Continue Shopping and Go to Cart Links */}
      <div className="mt-2 flex gap-4 sm:gap-8 justify-start w-full text-mytext font-satoshi text-[16px] border-mytext">
        <Link href="/products" className="hover:text-blue-800">Continue Shopping</Link> OR
        <Link href="/cart" className="hover:text-blue-800">Go to Cart</Link>
      </div>
    </div>
  );
};

export default CartActions;






