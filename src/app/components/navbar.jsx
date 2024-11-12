"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart.png";
import user from "../assets/user.png";
import { IoMdSearch } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FDFEFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Image
              className="h-7 lg:h-full mt-2 w-auto"
              src={logo}
              alt="OptiTrends logo"
            />
          </div>
          <div className="hidden lg:flex lg:space-x-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-900 px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium"
            >
              Shop
            </Link>
            <Link
              href="/features"
              className="text-gray-500 hover:text-gray-700 px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
            >
              Features
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative text-gray-600 hidden lg:block pr-[180px]">
              <input
                type="search"
                name="search"
                placeholder="Search for anything..."
                className="bg-white h-10 px-20 rounded text-sm focus:outline-none border-2"
              />
              <IoMdSearch className="absolute top-0 mt-3 ml-10 text-gray-400" />{" "}
            </div>

            <Link href="./signup">
            <div className="hidden lg:flex items-center space-x-4">
              <Image
                className="h-8 hover:cursor-pointer"
                src={user}
                alt="User icon"
              />
              <span>Login</span>
            </div>
            </Link>
            
            <div className="flex items-center space-x-2">
              <CiSearch className="lg:hidden h-[25px] w-[25px] hover:cursor-pointer" />
              <Link href="/cart" className="relative">
                <Image
                  className="h-[25px] w-[25px]"
                  src={cart_icon}
                  alt="Cart icon"
                />
                {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] rounded-full px-1">
                  3
                </span> */}
              </Link>

              <span className="hidden lg:inline">Cart</span>
            </div>
            <button onClick={toggleMenu} className="lg:hidden">
              {isMenuOpen ? (
                <IoClose className="text-2xl text-gray-600" />
              ) : (
                <IoMenu className="text-2xl text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute bg-white z-[999] w-full pb-8 shadow-md rounded-b-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-gray-700 hover:bg-gray-200 rounded-b-2xl px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-base font-medium"
            >
              Shop
            </Link>
            <Link
              href="/features"
              className="block text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-base font-medium"
            >
              Features
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
