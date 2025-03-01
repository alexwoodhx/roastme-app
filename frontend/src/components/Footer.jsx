import React from 'react';
import { FaHeart, FaFire, FaLaughSquint } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-bold">
          <FaFire className="text-yellow-300 animate-pulse" />
          Made with <FaHeart className="text-red-500 animate-beat" /> and <FaLaughSquint className="text-yellow-300" /> by Alex Wood
          <FaFire className="text-yellow-300 animate-pulse" />
        </p>
        <p className="text-yellow-200 text-xs mt-2 italic">
          Powered by OpenAI and a sprinkle of silliness
        </p>
        <p className="text-white text-xs mt-1 font-bold">
          &copy; {new Date().getFullYear()} AI Roast Me. No rights reserved. Roast freely!
        </p>
      </div>
    </footer>
  );
};

export default Footer; 