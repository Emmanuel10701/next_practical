"use client";

export default function Sidebar({ groups, currentRoom, onRoomChange }) {
  return (
    <div className="w-full md:w-1/3 bg-gray-200 p-4 md:border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group}
            className={`cursor-pointer p-3 rounded-lg flex items-center space-x-4 ${
              currentRoom === group
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-300 text-gray-800"
            }`}
            onClick={() => onRoomChange(group)}
          >
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
              {group.charAt(0).toUpperCase()}
            </div>
            <span className="text-lg font-medium">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
