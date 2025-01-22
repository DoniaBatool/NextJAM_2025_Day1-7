import React from "react";


const PrivacyPolicy = () => {
  return (
    <>
      
      <section id="privacy" className="w-full max-w-[1280px] my-[50px] mx-auto px-6 sm:px-8 lg:px-10 py-[50px]">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Privacy Policy
        </h1>
        <div className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to our Privacy Policy page. We value your privacy and are
              committed to protecting your personal data. This document outlines
              how we handle your information.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
            <p>
              We collect information you provide to us, such as name, email, and
              purchase details, to improve your experience. We do not sell or
              misuse your data.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p>
              Our website uses cookies to enhance user experience and analyze
              website traffic. You can manage cookie preferences in your browser
              settings.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p>
              We may share your data with trusted third-party services for
              payment processing or analytics purposes, but only to the extent
              necessary.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal data.
              Contact us at <a href="mailto:support@yourdomain.com" className="text-blue-600">support@yourdomain.com</a> to exercise these rights.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              For any questions or concerns about our privacy practices, feel
              free to contact us at <a href="mailto:privacy@yourdomain.com" className="text-blue-600">privacy@yourdomain.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
