// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#005f73] text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} CollegeKart. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-300 hover:text-white"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
