"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Head>
        <title>CollegeKart Landing Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav className="flex justify-between items-center bg-gray-800 p-4 md:p-6">
        <div className="flex items-center">
          <img src="landing/logo.png" alt="CollegeKart Logo" className="w-12 h-12 mr-2" />
          <span className="text-white text-2xl font-bold">ClgCart</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="#about" className="text-white text-lg hover:text-yellow-500">About</a>
          <a href="#features" className="text-white text-lg hover:text-yellow-500">Features</a>
          <a href="#contact-support" className="text-white text-lg hover:text-yellow-500">Contact us</a>
          <a href="/login" className="bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400">Login</a>
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col items-center space-y-4 py-4">
          <a href="#about" className="text-lg hover:text-yellow-500">About</a>
          <a href="#features" className="text-lg hover:text-yellow-500">Features</a>
          <a href="#contact-support" className="text-lg hover:text-yellow-500">Contact us</a>
          <a href="/login" className="bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400">Login</a>
        </div>
      )}

      <section id="about" className="text-center py-16 bg-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to ClgCart</h1>
        <p className="text-lg text-gray-600">
          Your Sustainable, Campus-Specific Marketplace for Affordable Student Essentials
        </p>
        <div className="inline-block pt-[20px]">
          <button className="bg-blue-700 text-white text-center text-[20px] font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all duration-300 ease-in-out">
            <a href="/marketplace">Visit Marketplace</a>
          </button>
        </div>
      </section>

      <section id="features" className="bg-gray-50 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose ClgCart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <img src={benefit.image} alt={benefit.alt} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="community" className="text-center py-16 bg-white">
        <h2 className="text-2xl font-bold">Join a Sustainable Community</h2>
        <p className="text-gray-600 mt-4">
          Connect with other students dedicated to eco-friendly practices and campus sustainability.
        </p>
        <img
          src="landing/community2.png"
          alt="Community Image"
          className="w-full max-w-3xl mx-auto mt-8 rounded-[70px]"
        />
      </section>

      <section id="contact-support" className="text-center py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Support</h2>
        <p className="text-gray-600 mb-8">
          Get in touch with us through any of the following platforms:
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <a
            href="mailto:contact@clgcart.tech"
            className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:shadow-md"
          >
            <img src="landing/mail.png" alt="Email Icon" className="w-8 h-8 mr-2" />
            <span className="font-medium">contact@clgcart.tech</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aakashuuu"
            target="_blank"
            className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:shadow-md"
          >
            <img src="landing/linkedin.png" alt="LinkedIn Icon" className="w-8 h-8 mr-2" />
            <span className="font-medium">@Aakashuuu</span>
          </a>
        </div>
      </section>

      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>© 2024 CollegeKart - All Rights Reserved</p>
      </footer>
    </div>
  );
}

const benefits = [
  {
    image: 'landing/afford.png',
    alt: 'Affordable',
    title: 'Affordable & Accessible',
    description: 'Access budget-friendly options for essentials like books, electronics, and furniture.',
  },
  {
    image: 'landing/sustainable.png',
    alt: 'Eco-Friendly',
    title: 'Eco-Friendly Marketplace',
    description: 'Encourages reusing goods, reducing waste, and promoting a sustainable campus.',
  },
  {
    image: 'landing/secure.png',
    alt: 'Campus-Only & Secure',
    title: 'Campus-Only & Secure',
    description: 'Secure, verified student accounts and safe transactions within your campus community.',
  },
  {
    image: 'landing/pickup.png',
    alt: 'Convenient Pickup',
    title: 'Convenient Pickup',
    description: 'Easily arrange for on-campus pickup, saving time and hassle for students.',
  },
  {
    image: 'landing/variety.png',
    alt: 'Wide Variety of Products',
    title: 'Wide Variety of Products',
    description: 'From books to dorm supplies, find everything you need in one marketplace.',
  },
  {
    image: 'landing/quality.png',
    alt: 'Quality Assured',
    title: 'Quality Assured',
    description: 'Verified sellers and products to ensure high quality for every purchase.',
  },
];
