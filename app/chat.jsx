import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-xl font-semibold">Chat Application</h1>
      </div>

      {/* Chat Container */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                index % 2 === 0
                  ? "bg-blue-100 text-blue-900 self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              } max-w-xs`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="bg-white py-4 px-6 shadow-inner flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
