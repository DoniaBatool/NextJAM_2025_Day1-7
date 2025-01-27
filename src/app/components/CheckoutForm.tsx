"use client";

import { client } from "@/sanity/lib/client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation

interface CustomerInfo {
  fullName: string;
  email: string;
  deliveryAddress: string;
  contactNumber: string;
}

export const CheckoutForm = () => {
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    deliveryAddress: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const router = useRouter(); // Initialize useRouter for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required.";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      try {
        // Save the form data to Sanity
        await client.create({
          _type: 'customerInfo', // The type defined in Sanity schema
          fullName: formData.fullName,
          email: formData.email,
          deliveryAddress: formData.deliveryAddress,
          contactNumber: formData.contactNumber,
        });
        alert("Order confirmed!");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          deliveryAddress: "",
          contactNumber: "",
        });
        // Redirect to orderSummary page after form submission
        router.push("/orderSummary");
      } catch (error) {
        console.error("Error saving data to Sanity:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-2 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
            Delivery Address
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border rounded-md ${errors.deliveryAddress ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.deliveryAddress && <p className="text-red-500 text-sm">{errors.deliveryAddress}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border rounded-md ${errors.contactNumber ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-mytext text-white py-2 px-4 rounded-md hover:bg-slate-800"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};
