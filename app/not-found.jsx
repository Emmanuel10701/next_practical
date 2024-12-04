"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-4 text-center">404</h1>
      <p className="text-lg md:text-xl mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <button
          onClick={() => router.push("/")}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
        >
          Go to Home
        </button>
        <button
          onClick={() => router.back()}
          className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm md:text-base"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
