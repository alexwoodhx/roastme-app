import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-purple-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaRobot className="text-2xl" />
          <span>AI Roast Me</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/alexwoodtech/roastme-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-purple-200 transition-colors"
          >
            <FaGithub className="text-xl" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 