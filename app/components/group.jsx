"use client";

const getBackgroundColor = (char) => {
  // Assign a color based on the alphabetical index
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
  const index = char.toLowerCase().charCodeAt(0) - 97; // Get the index (0-25 for a-z)
  return colors[index % colors.length]; // Loop colors if out of bounds
};

export default function Sidebar({ popples, currentRoom, onRoomChange }) {
  return (
    <div className="w-full md:w-1/4 bg-gradient-to-tl from-gray-800 to-black p-6 md:border-r border-gray-700 shadow-2xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Chats</h2>
      <div className="space-y-4">
        {popples.map((popple) => (
          <div
            key={popple}
            className={`cursor-pointer p-4 rounded-lg flex items-center space-x-4 transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              currentRoom === popple
                ? "bg-white text-black shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            onClick={() => onRoomChange(popple)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold ${
                currentRoom === popple
                  ? "bg-white text-gray-900"
                  : getBackgroundColor(popple.charAt(0))
              }`}
            >
              {popple.charAt(0).toUpperCase()}
            </div>
            <span className="text-lg font-medium">{popple}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
