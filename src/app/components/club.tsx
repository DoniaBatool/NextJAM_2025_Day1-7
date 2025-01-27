"use client";
import React, { useState } from "react";
import { client } from "@/sanity/lib/client"; // Ensure you have the Sanity client properly configured

const Club = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Check if the email already exists in Sanity
      const existingEmail = await client.fetch(
        `*[_type == "newsletter" && email == $email]`,
        { email }
      );

      if (existingEmail.length > 0) {
        setErrorMessage("This email is already subscribed.");
        return;
      }

      // Save email to Sanity
      await client.create({
        _type: "newsletter", // Schema name
        email, // The email to save
      });

      // Show success message and clear input and error message
      setSuccessMessage("Thank you for signing up!");
      setErrorMessage("");
      setEmail(""); // Clear input field

      // Remove success message after 10 seconds
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (error) {
      console.error("Error saving email to Sanity:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="max-w-[1440px] w-full h-[481px] bg-[#F9F9F9] flex justify-center items-center mx-auto">
      <div className="max-w-[1280px] w-full h-[364px] bg-white my-[52px] px-4">
        <div className="flex flex-col gap-[16px] mt-[68px] items-start xs:items-center">
          <h1
            id="touch"
            className="text-nowrap font-clash text-[20px] sm:text-[36px] leading-[140%] text-mytext text-left xs:text-center"
          >
            Join the club and get the benefits
          </h1>
          <div className="flex flex-col items-start xs:items-center xs:text-center font-satoshi text-[14px] xs:text-[16px] leading-[150%] text-mytext">
            <p>Sign up for our newsletter and receive exclusive</p>
            <p>offers on new ranges, sales, pop-up stores, and more</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-[70px] flex flex-row xs:justify-center justify-start">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[224px] xs:w-[354px] h-[56px] bg-[#F9F9F9] font-satoshi text-[16px] text-mytext pl-[32px] border border-[#4E4D93]"
          />
          <button
            type="submit"
            className="w-[118px] h-[56px] text-white font-satoshi text-[16px] leading-[150%] bg-mytext border border-[#4E4D93]"
          >
            Sign up
          </button>
        </form>
        {successMessage && (
          <p className="mt-4 text-center text-green-600 font-satoshi">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-center text-red-600 font-satoshi">{errorMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Club;
