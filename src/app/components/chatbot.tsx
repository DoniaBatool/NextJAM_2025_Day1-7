'use client';

import { useEffect, useState } from 'react';

export default function Mybot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 bg-gray-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer"
      >
        💬
      </button>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed bottom-20 right-6 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md z-50">
          I am a helpbot!
        </div>
      )}

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 h-[500px] overflow-hidden z-50">
          <div className="flex justify-between items-center bg-blue-500 text-white p-2">
            <h3 className="text-lg">Chat with us</h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
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
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}
