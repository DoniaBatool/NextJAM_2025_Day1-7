"use client";
import React, { useState, useEffect } from "react";
import Topbar from "@/app/components/topbar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { faqQuery } from "@/sanity/lib/queries";
import PrivacyPolicy from "../components/privacyPolicy";
import LicensePage from "../components/license";

interface faq {
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityFetch({ query: faqQuery });
        setFaqs(data);
      } catch {
        // Removed the unused `error` parameter
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <Topbar />
      </div>
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-[50px]">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-md transition-shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <PrivacyPolicy />
      <LicensePage />
    </>
  );
};

export default FAQPage;
