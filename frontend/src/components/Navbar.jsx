import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import { GiFireBomb } from 'react-icons/gi';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaRobot className="text-2xl animate-bounce" />
          <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500">AI ROAST ME</span>
          <GiFireBomb className="text-2xl text-yellow-300 animate-pulse" />
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-sm italic font-bold text-yellow-200 transform rotate-2 border-2 border-dashed border-yellow-300 px-2 py-1 rounded-lg">
            Prepare to be roasted!
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 