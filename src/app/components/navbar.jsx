"use client"
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-teal-700 text-white relative">
      <div className="flex items-center">
        <img src="landing/logo.png" alt="CollegeKart Logo" className="h-10 w-10 mr-2" />
        <span className="text-2xl font-bold">CollegeKart</span>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-96 p-2 rounded-full border-none outline-none"
        />
        <a href='\dashboard' className="px-4 py-2 bg-yellow-500 text-white rounded-full">Login</a>
        <a href='\dashboard' className="px-4 py-2 bg-yellow-500 text-white rounded-full">Sell Items</a>
        <a href='\dashboard' className="px-4 py-2 bg-yellow-500 text-white rounded-full">Profile</a>
      </div>

      <button
        className="md:hidden flex flex-col space-y-1 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block h-0.5 w-6 bg-white"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-teal-700 md:hidden flex flex-col items-center space-y-4 py-4">
          {/* <a href="/dashboard" className="text-white">Home</a>
          <a href="/dashboard" className="text-white">Shop</a>
          <a href="/features" className="text-white">Features</a>
          <a href="/contact" className="text-white">Contact</a> */}
        </div>
      )}
    </nav>
  );
}