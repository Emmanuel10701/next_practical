"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaComments, FaShieldAlt, FaVideo, FaUsers } from 'react-icons/fa';

const features = [
  {
    title: 'Real-time Messaging',
    description: 'Connect instantly with friends, family, or colleagues through real-time messaging.',
    icon: <FaComments className="text-white text-4xl" />,
  },
  {
    title: 'Secure Communication',
    description: 'End-to-end encryption ensures your conversations stay private.',
    icon: <FaShieldAlt className="text-white text-4xl" />,
  },
  {
    title: 'Video & Audio Calls',
    description: 'High-quality video and audio calls for personal or team collaboration.',
    icon: <FaVideo className="text-white text-4xl" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Create groups, share files, and manage projects seamlessly.',
    icon: <FaUsers className="text-white text-4xl" />,
  },
];

export default function Home() {
  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <header className="relative text-center py-16 bg-purple-50">
        <div className="flex flex-col-reverse md:flex-row items-center mx-4 md:mx-40 mt-10">
          <div className="md:w-1/2">
            <motion.h1
              className="mb-4 text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Experience Seamless <span className="text-purple-600">Communication</span>
            </motion.h1>
            <motion.p
              className="mb-8 max-w-xl mx-auto text-gray-500 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Stay connected, collaborate effectively, and enjoy secure conversations with our powerful chat platform.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8 }}
            >
              <a href="#signup">
                <button className="px-8 py-3 font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300">
                  Get Started
                </button>
              </a>
              <a href="#features">
                <button className="px-8 py-3 font-medium text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-100 transition duration-300">
                  Learn More
                </button>
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <Image src="/chat-hero.png" alt="Chat Hero" width={500} height={500} />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 mx-4 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Why Choose <span className="text-green-600">Our Chat App</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg transition-transform duration-500 transform hover:scale-105 flex flex-col items-center"
              >
                <span className="flex items-center justify-center mb-4 p-4 rounded-full bg-purple-500">
                  {feature.icon}
                </span>
                <h4 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h4>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="signup" className="py-16 text-center bg-purple-50">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your Conversations?</h2>
        <p className="text-lg mb-8 text-gray-500">Join thousands of users who trust our platform for their communication needs.</p>
        <a href="/signup">
          <button className="px-10 py-4 font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300">
            Sign Up Now
          </button>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-white">
        <p>&copy; 2024 ChatApp Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
