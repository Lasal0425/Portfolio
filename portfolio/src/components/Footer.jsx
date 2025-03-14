// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Lasal Rathnayake. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;