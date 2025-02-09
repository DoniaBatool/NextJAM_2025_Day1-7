"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Divider2 } from "./divider";
import { TiSocialLinkedin, TiSocialFacebook, TiSocialPinterest } from "react-icons/ti";
import { SlSocialSkype, SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";
import FooterTags from "./footerTags";
import { client } from "@/sanity/lib/client"; // Ensure the Sanity client is properly configured

const Footer = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
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
        _type: "newsletter",
        email,
      });

      // Show success message, clear error and input field
      setSuccessMessage("Thank you for joining our mailing list!");
      setErrorMessage("");
      setEmail("");

      // Remove success message after 10 seconds
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (error) {
      console.error("Error saving email to Sanity:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="max-w-[1440px] bg-[#2A254B] px-4 sm:px-[85px] mx-auto ">
      <div className="flex flex-col h-full justify-between pb-6">
        {/* Top Section */}
        <div className="flex flex-wrap pt-8 xl:flex-nowrap">
          {/* Main Grid Container */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 text-[14px] text-white font-satoshi">
            {/* Column 1 */}
            <div>
              <ul className="flex flex-col gap-2">
                <li className="font-clash text-[16px]">Menu</li>
                <li><Link href={"/products/Plantpots"}>Plant pots</Link></li>
                <li><Link href={"/products/Ceramics"}>Ceramics</Link></li>
                <li><Link href={"/products/Tables"}>Tables</Link></li>
                <li><Link href={"/products/Chairs"}>Chairs</Link></li>
                <li><Link href={"/products/Sofas"}>Sofas</Link></li>
                <li><Link href={"/products/Lamps"}>Lamps</Link></li>
                <li><Link href={"/products/Beds"}>Beds</Link></li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <FooterTags />
            </div>
            {/* Column 3 */}
            <div>
              <ul className="flex flex-col gap-2">
                <li className="font-clash text-[16px]">Our company</li>
                <li><Link href={"/about"}>About us</Link></li>
                <li><Link href={"/FAQ"}>FAQ</Link></li>
                <li><Link href={"/feedback"}>Feedback</Link></li>
                <li><Link href={"/FAQ#license"}>License</Link></li>
                <li><Link href={"/FAQ#privacy"}>Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          {/* Column 4 */}
          <div className="text-[16px] text-white font-clash mt-8 xl:mt-0">
            <ul className="flex flex-col gap-2">
              <li className="font-clash text-[16px]"><Link href={"/"}>Join our mailing list</Link></li>
              <li>
                <form onSubmit={handleSubmit} className="flex w-full h-[56px] border border-[#4E4D93]">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-[509px] h-[56px] bg-[#FFFFFF]/15 font-satoshi text-[16px] text-white pl-4"
                  />
                  <button
                    type="submit"
                    className="w-[100px] h-[56px] text-mytext font-satoshi text-[14px] bg-white"
                  >
                    Sign up
                  </button>
                </form>
                {successMessage && (
                  <p className="mt-2 text-green-500 font-satoshi">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="mt-2 text-red-500 font-satoshi">{errorMessage}</p>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Divider2 />

        {/* Footer Bottom */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="hidden sm:flex gap-4">
            <div className="bg-white rounded-sm"><TiSocialLinkedin size={20} color="#2A254B" /></div>
            <div className="bg-white rounded-sm"><TiSocialFacebook size={20} color="#2A254B" /></div>
            <div className="bg-[#2A254B]"><SlSocialInstagram size={20} color="#FFFFFF" /></div>
            <div className="bg-[#2A254B]"><SlSocialSkype size={20} color="#FFFFFF" /></div>
            <div className="bg-[#2A254B]"><SlSocialTwitter size={20} color="#FFFFFF" /></div>
            <div className="bg-white rounded-full"><TiSocialPinterest size={20} color="#2A254B" /></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[14px] text-white text-center mt-4">
          Copyright 2025 Avion LTD
        </div>
      </div>
    </section>
  );
};

export default Footer;
