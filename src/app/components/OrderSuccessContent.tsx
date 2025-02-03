"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { QRCodeCanvas } from "qrcode.react";

// Define TypeScript Interfaces
interface CustomerInfo {
  fullName: string;
  email: string;
  deliveryAddress: string;
  contactNumber: string;
}

interface CartItem {
  _key: string;
  productName: string;
  productDescription: string;
  serviceType: string;
  productPrice: number;
  quantity: number;
}

interface OrderDetails {
  _id: string;
  orderId: string;
  orderDate: string;
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
  trackingNumber?: string;
  carrier?:string;
}

const OrderSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [expectedDelivery, setExpectedDelivery] = useState<string | null>(null); // State for expected delivery date

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        try {
          const order: OrderDetails = await client.fetch(
            `*[_type == "order" && _id == $orderId][0]{
              _id,
              orderId,
              orderDate,
              cartItems,
              customerInfo->{
                fullName,
                email,
                deliveryAddress,
                contactNumber
              },
              trackingNumber,
              carrier,
            }`,
            { orderId }
          );
          setOrderDetails(order);

          // Calculate expected delivery date (3-5 days from order date)
          if (order.orderDate) {
            const orderDate = new Date(order.orderDate);
            const minDays = 3;
            const maxDays = 5;
            const deliveryMinDate = new Date(orderDate);
            const deliveryMaxDate = new Date(orderDate);
            deliveryMinDate.setDate(orderDate.getDate() + minDays);
            deliveryMaxDate.setDate(orderDate.getDate() + maxDays);

            const expectedDeliveryText = `${deliveryMinDate.toLocaleDateString()} - ${deliveryMaxDate.toLocaleDateString()}`;
            setExpectedDelivery(expectedDeliveryText);
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
      fetchOrderDetails();
    }
  }, [orderId]);

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-700">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-4">
          Thank You for Shopping with Us!
        </h1>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
          <p className="text-gray-600"><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p className="text-gray-600"><strong>Date:</strong> {orderDetails.orderDate}</p>
          <p className="text-gray-600"><strong>Tracking ID:</strong> {orderDetails.trackingNumber}</p>
          <p className="text-gray-600"><strong>Carrier:</strong> {orderDetails.carrier}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Customer Information</h3>
          <p className="text-gray-600"><strong>Name:</strong> {orderDetails.customerInfo.fullName}</p>
          <p className="text-gray-600"><strong>Email:</strong> {orderDetails.customerInfo.email}</p>
          <p className="text-gray-600"><strong>Address:</strong> {orderDetails.customerInfo.deliveryAddress}</p>
          <p className="text-gray-600"><strong>Contact:</strong> {orderDetails.customerInfo.contactNumber}</p>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cart Items</h3>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          {orderDetails.cartItems.map((item) => (
            <div key={item._key} className="border-b py-2">
              <p className="text-gray-700 font-medium">{item.productName}</p>
              <p className="text-gray-600 text-sm">{item.productDescription}</p>
              <p className="text-gray-600">Service: {item.serviceType}</p>
              <p className="text-gray-600">Price: <strong>£{item.productPrice}</strong></p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-4">Total Amount</h3>
        <p className="text-2xl font-bold text-green-600">
          £{orderDetails.cartItems.reduce(
            (total, item) => total + item.productPrice * item.quantity,
            0
          )}
        </p>

        {expectedDelivery && (
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">Expected Delivery:</p>
            <p className="text-gray-600">{expectedDelivery}</p>
          </div>
        )}

        {/* Display QR Code */}
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">Scan to View Order</h3>
          <QRCodeCanvas value={JSON.stringify(orderDetails)} size={180} />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessContent;
