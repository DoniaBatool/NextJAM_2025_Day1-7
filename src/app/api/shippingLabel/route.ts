import axios from "axios";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Ensure this path is correct

interface OrderDetails {
  _id: string;
  customerInfo: {
    fullName: string;
    deliveryAddress: string;
    contactNumber: string;
    email: string;
  };
}

interface ShippoParcel {
  length: string;
  width: string;
  height: string;
  distance_unit: string;
  weight: string;
  mass_unit: string;
}

interface ShippoResponse {
  results?: { tracking_number?: string; carrier?: string }[];
}


export async function POST(request: Request) {
  try {
    console.log("📩 Receiving request...");

    const orderDetails: OrderDetails = await request.json();
    console.log("📝 Order Details Received:", orderDetails);

    // Validate required fields
    if (!orderDetails.customerInfo || !orderDetails._id) {
      console.error("🚨 Missing required order details:", orderDetails);
      return NextResponse.json({ error: "Missing required order details." }, { status: 400 });
    }

    console.log("🚚 Sending request to Shippo API...");
    const response = await axios.post<ShippoResponse>(
      "https://api.goshippo.com/shipments/",
      {
        address_from: {
          name: "Avion Private Limited",
          street1: "Korangi Industrial Area",
          city: "Karachi",
          state: "Sindh",
          zip: "75444",
          country: "PK",
          phone: "+92-234-7865",
          email: "Avion@gmail.com",
        },
        address_to: {
          name: orderDetails.customerInfo.fullName,
          street1: orderDetails.customerInfo.deliveryAddress,
          city: "Karachi",
          state: "Sindh",
          zip: "75444",
          country: "PK",
          phone: orderDetails.customerInfo.contactNumber,
          email: orderDetails.customerInfo.email,
        },
        parcels: [
          {
            length: "110",
            width: "75",
            height: "50",
            distance_unit: "in",
            weight: "100",
            mass_unit: "kg",
          } as ShippoParcel,
        ],
        async: false,
      },
      {
        headers: {
          Authorization: `ShippoToken ${process.env.NEXT_PUBLIC_SHIPPO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Shippo API Response Received:", response.data);

    // Use default values if tracking number or carrier is not found
    const trackingNumber = response.data.results?.[0]?.tracking_number || "SHIPPO_TRANSIT"; // Default tracking number
    const carrier = response.data.results?.[0]?.carrier || "shippo"; // Default carrier

    console.log("📦 Tracking Number Generated:", trackingNumber);
    console.log("🚚 Carrier:", carrier);

    // Save the tracking number and carrier to Sanity
    console.log("🛠️ Updating order in Sanity with tracking number and carrier...");
    const updatedOrder = await client
      .patch(orderDetails._id)
      .set({ 
        trackingNumber: trackingNumber, // Use variable
        carrier: carrier, // Use variable
      }) // Update with both tracking number and carrier
      .commit();

    console.log("✅ Order Updated with Tracking Number and Carrier:", updatedOrder);

    return NextResponse.json({ trackingNumber, carrier });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error creating shipping label:", error.message);
      console.error("🔍 Full error details:", error.response?.data || error.message);
      return NextResponse.json(
        { error: "Error creating shipping label.", details: error.response?.data || error.message },
        { status: 500 }
      );
    }

    console.error("❌ Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred.", details: String(error) },
      { status: 500 }
    );
  }
}
