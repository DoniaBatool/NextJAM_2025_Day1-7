"use client";

import { CheckoutForm } from "../components/CheckoutForm";
import { useCart } from "../components/context/CartContext";
import Topbar from "../components/topbar";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cartpage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const [stockInfo, setStockInfo] = useState<{ [productId: string]: number }>({});
  const [showCheckout, setShowCheckout] = useState(false); // State to toggle CheckoutForm visibility

  useEffect(() => {
    // Fetch stock for all items in the cart on mount
    const fetchStock = async () => {
      const stockData: { [productId: string]: number } = {};

      for (const item of cart) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/getStock?productId=${item.productId}`
          );
          if (response.ok) {
            const data = await response.json();
            stockData[item.productId] = data.stock;
          }
        } catch (error) {
          console.error("Error fetching stock for product", item.productId, error);
        }
      }

      setStockInfo(stockData);
    };

    fetchStock();
  }, [cart]);

  const handleIncrement = async (productId: string) => {
    const item = cart.find((cartItem) => cartItem.productId === productId);
    if (item) {
      const availableStock = stockInfo[productId];

      if (item.isRenovate) {
        updateQuantity(productId, item.quantity + 1);
        return;
      }

      if (item.quantity < availableStock) {
        updateQuantity(productId, item.quantity + 1);
        await updateStock(productId, -1);
      } else {
        alert("You cannot exceed the available quantity.");
      }
    }
  };

  const handleDecrement = async (productId: string) => {
    const item = cart.find((cartItem) => cartItem.productId === productId);

    if (item && item.quantity > 0) {
      if (item.isRenovate) {
        updateQuantity(productId, item.quantity - 1);
        return;
      }

      updateQuantity(productId, item.quantity - 1);

      if (item.quantity - 1 === 0) {
        removeItem(productId);
      }
      await updateStock(productId, 1);
    }
  };

  const updateStock = async (productId: string, quantityChange: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/updateStock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantityChange,
        }),
      });

      if (response.ok) {
        console.log(`Stock for product ${productId} updated successfully.`);
      } else {
        console.error("Failed to update stock.");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    ).toFixed(2); // Format to 2 decimal places
  };

  const calculateTax = (subtotal: number) => {
    return (subtotal * 0.05).toFixed(2); // Format to 2 decimal places
  };

  const calculateShipping = (subtotal: number) => {
    return (subtotal * 0.07).toFixed(2); // Format to 2 decimal places
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax(subtotal));
    const shipping = parseFloat(calculateShipping(subtotal));
    return (subtotal + tax + shipping).toFixed(2); // Format to 2 decimal places
  };

  return (
    <main>
      <div className="max-w-[1440px] mx-auto">
        <Topbar />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
        <div className="max-w-[1064px] h-auto mx-auto bg-[#F9F9F9]">
          <div className="pt-8 px-4 sm:px-10">
            <h1 className="font-clash text-[24px] sm:text-[36px] leading-[140%] text-mytext">
              Your shopping cart
            </h1>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="hidden md:flex mt-8 text-sm sm:text-[14px] justify-between font-clash text-mytext px-8">
                <div className="flex-1">
                  <h6>Product</h6>
                </div>
                <div className="w-[200px] text-center mr-[30px]">
                  <h6>Quantity</h6>
                </div>
                <div className="w-[100px] text-right">
                  <h6>Total</h6>
                </div>
              </div>

              <div className="w-full border border-[#EBE8F4] my-4"></div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 px-4 sm:px-10"
                  >
                    <div className="w-[109px]">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        width={109}
                        height={134}
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-mytext font-clash text-[18px] sm:text-[20px] leading-[140%]">
                        {item.productName}
                      </h4>
                      <p className="text-[14px] sm:text-[16px] font-satoshi text-mytext">
                        £{item.productPrice}
                      </p>
                      <p className="text-[12px] sm:text-[14px] leading-[150%] font-satoshi text-mytext">
                        {item.productDescription}
                      </p>
                      {item.isRenovate && (
                        <p className="text-green-500 text-[12px]">
                          Renovate option selected
                        </p>
                      )}
                    </div>
                    <div className="w-[200px] flex flex-col justify-center items-center gap-2 md:gap-6">
                      <div className="flex justify-center items-center gap-4 md:gap-6">
                        <button
                          className="text-slate-500"
                          onClick={() => handleDecrement(item.productId)}
                          disabled={item.quantity === 0}
                        >
                          -
                        </button>
                        <p className="text-mytext text-[14px] sm:text-[16px]">
                          {item.quantity}
                        </p>
                        <button
                          className="text-slate-500"
                          onClick={() => handleIncrement(item.productId)}
                          disabled={
                            item.quantity >= stockInfo[item.productId] &&
                            !item.isRenovate
                          }
                        >
                          +
                        </button>
                      </div>
                      {item.quantity >= stockInfo[item.productId] &&
                        !item.isRenovate && (
                          <p className="text-red-500 text-[12px]">
                            You cannot exceed the available quantity.
                          </p>
                        )}
                    </div>
                    <div className="w-[100px] md:text-right text-mytext text-[16px] sm:text-[18px] text-center">
                      £{(item.productPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full border border-[#EBE8F4] my-4"></div>

              <div className="flex flex-col items-end px-4 sm:px-10 gap-4">
                <div className="flex items-center gap-4">
                  <h4 className="text-[#4E4D93] text-[18px] sm:text-[20px] font-clash leading-[140%]">
                    Subtotal
                  </h4>
                  <h3 className="text-[20px] sm:text-[24px] font-clash text-mytext">
                    £{parseFloat(calculateSubtotal()).toFixed(2)}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <h4 className="text-[#4E4D93] text-[18px] sm:text-[20px] font-clash leading-[140%]">
                    Tax (5%)
                  </h4>
                  <h3 className="text-[20px] sm:text-[24px] font-clash text-mytext">
                    £{parseFloat(calculateTax(parseFloat(calculateSubtotal()))).toFixed(2)}
                  </h3>
                </div>
               
                <div className="w-full border border-[#EBE8F4] my-4"></div>
                <div className="flex items-center gap-4">
                  <h4 className="text-[#4E4D93] text-[18px] sm:text-[20px] font-clash leading-[140%]">
                    Total
                  </h4>
                  <h3 className="text-[20px] sm:text-[24px] font-clash text-mytext">
                    £{parseFloat(calculateTotal()).toFixed(2)}
                  </h3>
                </div>
              </div>

              <div className=" flex mt-8 justify-end mr-9">
                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className="text-white rounded-md text-[14px] w-full sm:text-[16px] 
                  sm:w-[172px] font-satoshi leading-[150%] cursor-pointer 
                  px-6 sm:px-8 py-3 sm:py-4 mb-10 bg-mytext hover:border text-nowrap"
                >
                   Checkout
                </button>
                {showCheckout && <CheckoutForm/>}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-8">
              <p className="text-mytext font-clash text-[24px] sm:text-[36px]">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cartpage;
