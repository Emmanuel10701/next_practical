import React from "react";

// Function to get dynamic background color
const getBackgroundColor = (char) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
  ];
  const index = char.toLowerCase().charCodeAt(0) - 97; // Get index (0-25 for a-z)
  return colors[index % colors.length]; // Loop colors if out of bounds
};

export default function Sidebar({ groups, currentRoom, onRoomChange }) {
  return (
    <div className="w-64  text-slate-500 h-full">
      {/* Sidebar Header */}
      <div className="flex justify-between items-center py-4 px-6 bg-blue-700">
        <h2 className="text-lg font-semibold text-white">Chat Rooms</h2>
      </div>

      {/* Room List */}
      <div className="space-y-2 px-4 py-6">
        {groups.map((group, index) => (
          <div
            key={index}
            onClick={() => onRoomChange(group)} // Change room when clicked
            className={`cursor-pointer py-2 px-4 rounded-md hover:bg-blue-600 ${
              group === currentRoom ? "bg-slate-300" : "bg-white"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold ${
                group === currentRoom
                  ? "bg-white text-gray-900"
                  : getBackgroundColor(group.charAt(0))
              }`}
            >
              {group.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-lg">{group.charAt(0).toUpperCase() + group.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
