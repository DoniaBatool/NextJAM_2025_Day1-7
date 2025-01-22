import React from "react";


const LicensePage = () => {
  return (
    <>
      
      <section id="license" className="w-full mb-[150px] max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-[50px]">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          License Agreement
        </h1>
        <div className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ownership and Copyright</h2>
            <p>
              All content, images, and products on this website are owned by
              <strong> Avion Private Ltd</strong>. Unauthorized reproduction,
              distribution, or modification is strictly prohibited.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Usage Rights</h2>
            <p>
              You are granted a non-exclusive, non-transferable license to use
              the purchased products for personal purposes only. Commercial usage is
              strictly prohibited unless explicitly stated.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Limitations of Use</h2>
            <ul className="list-disc pl-5">
              <li>You may not resell, sublicense, or redistribute any products purchased from this website.</li>
              <li>You may not use our designs, images, or other intellectual property for illegal activities.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Warranty Disclaimer</h2>
            <p>
              We provide products as it is without warranties of any kind. We disclaim
              all warranties, express or implied.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about licensing, please contact us at:
              <br />
              <strong>Email:</strong> <a href="mailto:support@yourdomain.com" className="text-blue-600">support@yourdomain.com</a>
              <br />
              <strong>Phone:</strong> +123-456-7890
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LicensePage;
