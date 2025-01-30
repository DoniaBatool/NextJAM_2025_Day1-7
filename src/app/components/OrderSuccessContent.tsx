"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

interface Order {
  _id: string;
  orderId: string;
}

const OrderSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const fetchedOrder: Order | null = await client.fetch(
          `*[_type == "order" && orderId == $orderId][0]`,
          { orderId }
        );
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
      <h1 className="font-clash text-[24px] sm:text-[36px] text-mytext">
        Order Successful!
      </h1>
      <p className="text-lg">Your order ID is: <strong>{order.orderId}</strong></p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
};

export default OrderSuccessContent;
