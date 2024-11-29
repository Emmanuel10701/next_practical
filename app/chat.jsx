import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [room, setRoom] = useState("general"); // Current room
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    // Connect to Socket.IO
    socket = io();

    // Join the current room
    socket.emit("join", { userId: "user123", room });

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]); // Rejoin when the room changes

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { room, message, userId: "user123", replyTo });
      setMessage("");
      setReplyTo(null);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar for Groups */}
      <div className="w-full md:w-1/3 bg-gray-200 p-4 md:border-r border-gray-300">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <div className="space-y-2">
          {["general", "sports", "tech"].map((grp) => (
            <div
              key={grp}
              className={`cursor-pointer p-3 rounded-lg flex items-center space-x-4 ${
                room === grp
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setRoom(grp)}
            >
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
                {grp.charAt(0).toUpperCase()}
              </div>
              <span className="text-lg font-medium">{grp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="bg-blue-500 text-white py-4 px-6 shadow-md flex items-center">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mr-4">
            {room.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-semibold">Chat Room: {room}</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`space-y-1 ${
                msg.userId === "user123" ? "text-right" : "text-left"
              }`}
            >
              {msg.replyTo && (
                <div className="text-gray-500 text-sm pl-4 border-l-2 border-gray-300">
                  Replying to: {msg.replyTo.message}
                </div>
              )}
              <div
                className={`p-3 rounded-lg inline-block max-w-xs ${
                  msg.userId === "user123"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
              <span className="text-xs text-gray-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="bg-gray-100 py-4 px-6 flex items-center space-x-4">
          {replyTo && (
            <div className="text-sm text-gray-500 border px-2 py-1 rounded">
              Replying to: {replyTo.message}
              <button
                className="ml-2 text-red-500"
                onClick={() => setReplyTo(null)}
              >
                Cancel
              </button>
            </div>
          )}
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
    </div>
  );
}
