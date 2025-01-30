"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios"; // Import Axios

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [trackingInfo, setTrackingInfo] = useState<any>(null); // For storing tracking info
  const [isTracking, setIsTracking] = useState(false); // Loading state
  const [isShippingLabelCreating, setIsShippingLabelCreating] = useState(false); // For shipping label creation state

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        try {
          const order = await client.fetch(
            `*[_type == "order" && _id == $orderId][0]{
              _id, // Adding _id to the fetch query
              orderId,
              orderDate,
              cartItems,
              customerInfo->{
                fullName,
                email,
                deliveryAddress,
                contactNumber
              },
              trackingNumber // Assuming the tracking number is stored in the order
            }`,
            { orderId }
          );
          setOrderDetails(order);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
      fetchOrderDetails();
    }
  }, [orderId]);

  // Track order using Shippo API
  const trackOrder = async () => {
    if (!orderDetails?.trackingNumber) {
      alert("No tracking number available.");
      return;
    }

    setIsTracking(true);
    try {
      const response = await axios.post(
        "https://api.goshippo.com/trackings/", // Shippo API URL
        {
          tracking_number: orderDetails.trackingNumber, // Use the tracking number from the order
        },
        {
          headers: {
            "Authorization": `ShippoToken ${process.env.NEXT_PUBLIC_SHIPPO_API_KEY}`, // Use your Shippo API key here
            "Content-Type": "application/json",
          },
        }
      );

      // Set the tracking information in state
      setTrackingInfo(response.data);
      setIsTracking(false);
    } catch (error) {
      console.error("Error tracking order:", error);
      setIsTracking(false);
      alert("Failed to track the order. Please try again.");
    }
  };

  // Create Shipping Label and Get Tracking Number
  const createShippingLabel = async () => {
    if (!orderDetails) {
      alert("Order details are missing.");
      return;
    }

    setIsShippingLabelCreating(true);
    try {
      // Call the shipping label API to generate tracking info, including order._id
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shippingLabel`, {
        ...orderDetails, // Spread orderDetails to include all fields
        _id: orderDetails._id, // Include the _id here to ensure it's passed
      });

      if (response.data.trackingNumber) {
        // Save the tracking number to the order document in Sanity
        await client
          .patch(orderDetails._id) // Update the current order document by ID
          .set({
            trackingNumber: response.data.trackingNumber, // Update tracking number in the order
          })
          .commit();

        // Set tracking info to show in the UI
        setTrackingInfo(response.data);
      } else {
        alert("Failed to create shipping label.");
      }
    } catch (error) {
      console.error("Error creating shipping label:", error);
      setIsShippingLabelCreating(false);
      alert("Error creating shipping label.");
    }
  };

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
          <p className="text-gray-600 mt-1"><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p className="text-gray-600"><strong>Date:</strong> {orderDetails.orderDate}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Customer Information</h3>
          <p className="text-gray-600"><strong>Name:</strong> {orderDetails.customerInfo?.fullName}</p>
          <p className="text-gray-600"><strong>Email:</strong> {orderDetails.customerInfo?.email}</p>
          <p className="text-gray-600"><strong>Address:</strong> {orderDetails.customerInfo?.deliveryAddress}</p>
          <p className="text-gray-600"><strong>Contact:</strong> {orderDetails.customerInfo?.contactNumber}</p>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cart Items</h3>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          {orderDetails.cartItems.map((item: any) => (
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
            (total: number, item: any) => total + item.productPrice * item.quantity,
            0
          )}
        </p>

        {/* Tracking Button */}
        <div className="mt-6">
          <button
            onClick={trackOrder}
            className="bg-mytext text-white px-8 py-4 rounded-md text-[16px]"
            disabled={isTracking}
          >
            {isTracking ? "Tracking..." : "Track Your Order"}
          </button>
        </div>

        {/* Create Shipping Label Button */}
        <div className="mt-6">
          <button
            onClick={createShippingLabel}
            className="bg-mytext text-white px-8 py-4 rounded-md text-[16px]"
            disabled={isShippingLabelCreating}
          >
            {isShippingLabelCreating ? "Creating Shipping Label..." : "Create Shipping Label"}
          </button>
        </div>

        {trackingInfo && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Tracking Information</h3>
            <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(trackingInfo, null, 2)}</pre>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">Scan to View Order</h3>
          <div className="p-2 bg-white rounded-lg shadow-md">
            <QRCodeCanvas value={JSON.stringify(orderDetails)} size={180} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
