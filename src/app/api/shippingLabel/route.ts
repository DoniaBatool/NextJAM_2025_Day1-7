import axios from "axios";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Ensure this path is correct

export async function POST(request: Request) {
  try {
    console.log("📩 Receiving request...");

    const orderDetails = await request.json(); // Assuming orderDetails is sent in request body
    console.log("📝 Order Details Received:", orderDetails);

    // Validate required fields
    if (!orderDetails.customerInfo || !orderDetails._id) {
      console.error("🚨 Missing required order details:", orderDetails);
      return NextResponse.json({ error: "Missing required order details." }, { status: 400 });
    }

    console.log("🚚 Sending request to Shippo API...");
    const response = await axios.post(
      "https://api.goshippo.com/shipments/",
      {
        address_from: {
          name: "Avion Private Limited",
          street1: "Korangi Industrial Area",
          city: "Karachi",
          state: "Sindh",
          zip: "75444",
          country: "PK", // Corrected country code to standard ISO format
          phone: "+92-234-7865",
          email: "Avion@gmail.com",
        },
        address_to: {
          name: orderDetails.customerInfo?.fullName,
          street1: orderDetails.customerInfo?.deliveryAddress,
          city: "Karachi", // Assuming city is Karachi
          state: "Sindh",
          zip: "75444", // Replace with actual zip if needed
          country: "PK", // Corrected country code
          phone: orderDetails.customerInfo?.contactNumber,
          email: orderDetails.customerInfo?.email,
        },
        parcels:[ {
          length: "110", // Adjust to your actual parcel dimensions
          width: "75",
          height: "50",
          distance_unit: "in",
          weight: "100", // Ensure this weight is correct
          mass_unit: "kg",
        }],
        async: false,
      },
      {
        headers: {
          "Authorization": `ShippoToken ${process.env.NEXT_PUBLIC_SHIPPO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Shippo API Response Received:", response.data);

    // Check if response contains tracking number
    const trackingNumber = response.data?.results?.[0]?.tracking_number; // Adjust based on response structure
    if (!trackingNumber) {
      console.error("🚨 Tracking number missing in Shippo response:", response.data);
      throw new Error("Tracking number not found in Shippo response.");
    }

    console.log("📦 Tracking Number Generated:", trackingNumber);

    // Save the tracking number to Sanity
    console.log("🛠️ Updating order in Sanity with tracking number...");
    const updatedOrder = await client
      .patch(orderDetails._id)
      .set({ trackingNumber })
      .commit();

    console.log("✅ Order Updated with Tracking Number:", updatedOrder);

    return NextResponse.json({ trackingNumber });
  } catch (error: any) {
    console.error("❌ Error creating shipping label:", error.message);
    console.error("🔍 Full error details:", error.response?.data || error);

    return NextResponse.json(
      { error: "Error creating shipping label.", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
