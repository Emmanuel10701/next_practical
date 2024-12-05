"use client";

export default function Sidebar({ groups, currentRoom, onRoomChange }) {
  return (
    <div className="w-full md:w-1/3 bg-gradient-to-tl from-blue-400 to-indigo-500 p-6 md:border-r border-gray-300 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Chats</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group}
            className={`cursor-pointer p-4 rounded-lg flex items-center space-x-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentRoom === group
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-blue-50 hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => onRoomChange(group)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold ${
                currentRoom === group ? "bg-blue-600" : "bg-blue-400"
              }`}
            >
              {group.charAt(0).toUpperCase()}
            </div>
            <span className="text-lg font-medium">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
