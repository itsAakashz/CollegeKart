"use client"
import React, { useState } from 'react';
import { MdDashboard } from 'react-icons/md';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#005f73] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src="landing/logo.png" alt="" srcset="" />
        <div className="text-lg font-bold">
          <a href="/" className="hover:underline">
            CollegeKart
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded text-black"
          />
        </div>

        {/* Desktop Dashboard Link */}
        <div className="hidden lg:block">
          <a href="/dashboard" className="hover:underline font-semibold">
            Dashboard
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            <MdDashboard />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 text-center">
          <a
            href="/dashboard"
            className="block text-lg text-white py-2 hover:bg-[#003d48] rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
