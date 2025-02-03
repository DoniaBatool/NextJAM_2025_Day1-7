"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext";

interface CustomerInfo {
  fullName: string;
  email: string;
  deliveryAddress: string;
  contactNumber: string;
}

interface CartItem {
  _key?: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  cartItems: CartItem[];
}

const OrderPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const orderId = searchParams.get("orderId");
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    deliveryAddress: "",
    contactNumber: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId) {
      alert("Order ID not found.");
      return;
    }

    try {
      const order: Order | null = await client.fetch(
        `*[_type == "order" && orderId == $orderId][0]`,
        { orderId }
      );

      if (!order) {
        alert("Order not found.");
        return;
      }

      const customerDoc = await client.create({
        _type: "customer",
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        contactNumber: customerInfo.contactNumber,
        deliveryAddress: customerInfo.deliveryAddress,
        orderReference: {
          _type: "reference",
          _ref: order._id,
        },
      });

      const updatedCartItems: CartItem[] = (order.cartItems || []).map((item) => ({
        ...item,
        _key: item._key || crypto.randomUUID(),
      }));

      await client
        .patch(order._id)
        .set({
          customerInfo: {
            _type: "reference",
            _ref: customerDoc._id,
          },
          cartItems: updatedCartItems,
        })
        .commit();

      alert("Order confirmed!");

      // ✅ Clear the cart after order confirmation
      clearCart();

      setTimeout(() => {
        router.push(`/orderSuccess?orderId=${order._id}`);
      }, 500);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to confirm order. Please try again.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
      <h1 className="font-clash text-[24px] sm:text-[36px] text-mytext">Enter Your Information</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6 mb-5">
        <div>
          <label className="text-mytext text-[16px]" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full p-2 mt-2"
            value={customerInfo.fullName}
            onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-mytext text-[16px]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 mt-2"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-mytext text-[16px]" htmlFor="deliveryAddress">
            Delivery Address
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            className="w-full p-2 mt-2"
            value={customerInfo.deliveryAddress}
            onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryAddress: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-mytext text-[16px]" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="w-full p-2 mt-2"
            value={customerInfo.contactNumber}
            onChange={(e) => setCustomerInfo({ ...customerInfo, contactNumber: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-mytext text-white px-8 py-4 rounded-md text-[16px]">
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPageContent;