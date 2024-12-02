
"use client"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to access your account
        </p>
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center w-full py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-3" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        <p className="text-center text-sm text-gray-500 mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}
