import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-1 text-sm">
          Made with <FaHeart className="text-red-500" /> by Alex Wood
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Powered by OpenAI and React
        </p>
        <p className="text-gray-400 text-xs mt-1">
          &copy; {new Date().getFullYear()} AI Roast Me. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 