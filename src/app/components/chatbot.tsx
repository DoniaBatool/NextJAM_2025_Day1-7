"use client";
import { useState, useEffect } from "react";

// Define the type for each message
interface Message {
  role: string;
  content: string;
}

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility

  useEffect(() => {
    // Show the popup on page load for 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    // Cleanup the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (userMessage.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setLoading(true);

    // Send the message to your API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage }),
    });

    const data = await response.json();
    const botResponse = data.message;

    setMessages([...newMessages, { role: "bot", content: botResponse }]);
    setLoading(false);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-neutral-900 w-12 h-12 rounded-full shadow-lg
         flex items-center justify-center text-white hover:bg-slate-700 focus:outline-none"
      >
        💬
      </button>

      {/* Popup Message */}
      {showPopup && (
        <div className="absolute bottom-20 right-6 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md z-50">
          I am a helpbot!
        </div>
      )}

      {/* Chatbot Dialog Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 p-4 bg-white shadow-lg rounded-lg z-50 border border-gray-300">
          <div className="chat-window max-h-80 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 ${
                  msg.role === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && <p className="italic text-gray-500">Bot is typing...</p>}
          </div>
          <div className="input-area flex">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
