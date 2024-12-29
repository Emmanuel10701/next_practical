"use client"; // To ensure this component works in Next.js 13+ with client-side rendering

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/group";
import io from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

let socket;

export default function Chat() {
  const { data: session, status } = useSession(); // Get session data and loading status
  const [room, setRoom] = useState("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Skip rendering while session is loading
    if (!session) return; // If no session, don't proceed with socket connection

    // Connect to the socket server
    socket = io();

    // Join the room
    socket.emit("join", { userId: session.user.id, room });

    // Fetch initial messages from MongoDB
    fetch(`/api/socket?room=${room}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Fetched data is not an array", data);
          setMessages([]); // Set default empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setMessages([]); // Handle fetch error gracefully
      });

    // Listen for incoming messages from socket
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room, session, status]);

  const sendMessage = () => {
    if (!session) {
      alert("You must log in to send messages!");
      return;
    }

    if (message.trim()) {
      const newMessage = {
        message,
        userId: session.user.id,
        room,
        status: "sent",
        replyTo,
        createdAt: new Date().toISOString(), // Set timestamp for new messages
      };

      // Send message to MongoDB via API route
      fetch("/api/socket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      })
        .then((res) => res.json())
        .then((msg) => {
          setMessages((prev) => [...prev, msg]);
          socket.emit("sendMessage", msg);
        });

      setMessage("");
      setReplyTo(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    ); // Display Material UI spinner while session is loading
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        groups={["general", "sports", "tech"]}
        currentRoom={room}
        onRoomChange={setRoom}
      />

      {/* Chat Section */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="bg-blue-500 text-white py-4 px-6 shadow-md flex items-center">
          {/* Profile section */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-xl font-semibold">
              {session.user.name ? `Hello, ${session.user.name}` : "Chat Room"}
            </h1>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`space-y-1 ${msg.userId === session?.user?.id ? "text-right" : "text-left"}`}
            >
              {msg.replyTo && (
                <div className="text-gray-500 text-sm pl-4 border-l-2 border-gray-300">
                  Replying to: {msg.replyTo.message}
                </div>
              )}
              <div
                className={`p-3 rounded-lg inline-block max-w-xs ${
                  msg.userId === session?.user?.id
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message}
                <span className="text-xs text-gray-400 ml-2">
                  {msg.status === "sent" && "•"}
                  {msg.status === "delivered" && "✔"}
                  {msg.status === "read" && "✔✔"}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Unknown Time"}
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
          <div className="flex items-center justify-center space-x-4 p-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full md:w-2/3 border border-gray-300 rounded-lg px-8 py-6 shadow-lg text-xl font-medium focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 transition-all duration-200"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-6 rounded-lg shadow-xl text-xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring focus:ring-blue-400 transition-transform transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
