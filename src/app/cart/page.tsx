"use client";

import { useCart } from "../components/context/CartContext";
import Topbar from "../components/topbar";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { getStockAction } from "../Actions/cartActions";


const Cartpage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const [stockInfo, setStockInfo] = useState<Record<string, number>>({});

  const fetchStock = useCallback(async (productId: string) => {
    try {
      const stock = await getStockAction(productId);
      setStockInfo((prev) => ({ ...prev, [productId]: stock }));
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  }, []);

  useEffect(() => {
    cart.forEach((item) => fetchStock(item.productId));
  }, [cart, fetchStock]);

  const calculateSubtotal = () => cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  const calculateTax = (subtotal: number) => subtotal * 0.05;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + calculateTax(subtotal);
  };

  const handleCheckout = async () => {
    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      orderId,
      cartItems: cart.map((item) => ({
        _key: `${item.productId}-${item.serviceType}`,
        productName: item.productName,
        productDescription: item.productDescription,
        quantity: item.quantity,
        serviceType: item.serviceType,
        productPrice: item.productPrice,
      })),
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create({ _type: "order", ...orderData });
      window.location.href = `/orderPage?orderId=${orderId}`;
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
      <Topbar />
      <div className="max-w-[1340px] mx-auto">
        <h1 className="font-clash text-[24px] sm:text-[36px] text-mytext pt-8 px-4 sm:px-10">Your shopping cart</h1>
        {cart.length > 0 ? (
          <>
            <div className="hidden sm:grid grid-cols-6 gap-4 mt-8 text-sm font-clash text-mytext px-8">
              <h6 className="col-span-2">Product</h6>
              <h6 className="text-center">Quantity</h6>
              <h6 className="text-center">Service</h6>
              <h6 className="text-center">Remove</h6>
              <h6 className="text-right">Total</h6>
            </div>
            <div className="border border-[#EBE8F4] my-4"></div>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.productId} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center p-4">
                  <div className="flex flex-col sm:flex-row items-center col-span-2 gap-4">
                    <Image src={item.productImage} alt={item.productName} width={80} height={100} className="w-20 h-auto" />
                    <div className="text-center sm:text-left">
                      <h4 className="text-mytext font-clash text-[18px] sm:text-[20px] truncate">{item.productName}</h4>
                      <p className="text-[14px] sm:text-[16px] font-satoshi text-mytext">£{item.productPrice}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                      <button onClick={() => updateQuantity(item.productId, item.serviceType, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                      <p className="text-mytext">{item.quantity}</p>
                      <button onClick={() => updateQuantity(item.productId, item.serviceType, item.quantity + 1)} disabled={item.quantity >= (stockInfo[item.productId] || 0)}>+</button>
                    </div>
                  </div>
                  <p className="text-center text-mytext">{item.serviceType}</p>
                  <button className="text-red-500 hover:text-red-700 mx-auto" onClick={() => removeItem(item.productId, item.serviceType)}>
                    <FaTrashAlt size={20} />
                  </button>
                  <p className="text-right text-mytext font-bold">£{(item.productPrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border border-[#EBE8F4] my-4"></div>
            <div className="p-4 bg-white shadow-md rounded-lg mt-4 text-mytext">
              <div className="flex justify-between text-[16px]">
                <span>Subtotal:</span>
                <span>£{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span>5% Tax:</span>
                <span>£{calculateTax(calculateSubtotal()).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-4">
                <span>Total:</span>
                <span>£{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-end px-4 mb-8 mt-6">
              <button className="text-white bg-mytext px-6 py-3 rounded-md text-[16px] sm:w-[172px]" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-8">
            <p className="text-mytext font-clash text-[24px] sm:text-[36px]">Your cart is empty.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cartpage;