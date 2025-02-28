import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaCrown, FaRegClock, FaShare } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname !== 'localhost';

const RoastDisplay = ({ roast }) => {
  const { name, roast: roastText, isPremium, createdAt } = roast;
  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Roast Me',
        text: `Check out this AI roast for ${name}: "${roastText}"`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully'))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error('Failed to share');
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(`AI Roast for ${name}: "${roastText}" - ${window.location.href}`)
        .then(() => toast.success('Copied to clipboard'))
        .catch(() => toast.error('Failed to copy'));
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-800">
          Roast for {name}
        </h3>
        {isPremium && (
          <span className="flex items-center text-yellow-500 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
            <FaCrown className="mr-1" /> 
            {isGitHubPages ? 'Demo Premium' : 'Premium'}
          </span>
        )}
      </div>
      
      <div className="relative my-6 px-6">
        <FaQuoteLeft className="absolute top-0 left-0 text-purple-300 opacity-50 text-xl" />
        <p className="text-lg text-gray-800 leading-relaxed">
          {roastText}
        </p>
        <FaQuoteRight className="absolute bottom-0 right-0 text-purple-300 opacity-50 text-xl" />
      </div>
      
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div className="flex items-center">
          <FaRegClock className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        <button
          onClick={handleShare}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        >
          <FaShare className="mr-1" />
          Share
        </button>
      </div>
    </div>
  );
};

export default RoastDisplay; 