import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [room, setRoom] = useState("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    socket = io();

    socket.emit("join", { userId: "user123", room });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [room]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        room,
        message,
        userId: "user123",
        replyTo,
      });
      setMessage("");
      setReplyTo(null); // Clear reply
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-xl font-semibold">Chat Room: {room}</h1>
      </div>

      {/* Chat Container */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="space-y-1">
            {msg.replyTo && (
              <div className="text-gray-500 text-sm pl-4 border-l-2 border-gray-300">
                Replying to: {msg.replyTo.message}
              </div>
            )}
            <div
              className={`p-3 rounded-lg ${
                msg.userId === "user123"
                  ? "bg-blue-100 text-blue-900 self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              } max-w-xs`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white py-4 px-6 shadow-inner flex items-center space-x-4">
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
  );
}
