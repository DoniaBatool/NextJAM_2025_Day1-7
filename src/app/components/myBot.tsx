'use client';

import { useEffect, useState } from 'react';

export default function Mybot() {
  const [isOpen, setIsOpen] = useState(false);
   const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  
    useEffect(() => {
      // Show the popup on page load for 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
  
      // Cleanup the timer to avoid memory leaks
      return () => clearTimeout(timer);
    }, []);
  

  return (
    <div>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gray-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer"
      >
        💬
      </div>
       {/* Popup Message */}
       {showPopup && (
        <div className="fixed bottom-20 right-6 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md z-50">
          I am a helpbot!
        </div>
      )}

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 h-[500px] overflow-hidden">
          <div className="flex justify-between items-center bg-blue-500 text-white p-2">
            <h3 className="text-lg">Chat with us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold"
            >
              ✕
            </button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/YzLbWO3eBsR6FHnS9vGuG"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
}

