import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaRegClock, FaCrown } from 'react-icons/fa';

const RoastDisplay = ({ name, roastText, isPremium, formattedDate, isGitHubPages, handleShare }) => {
  // Add random rotation for meme effect
  const randomRotation = () => {
    const degrees = Math.random() * 2 - 1; // Random value between -1 and 1
    return `rotate(${degrees}deg)`;
  };

  return (
    <div className="text-center">
      {name && (
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-purple-800">
          Roast for {name}
        </h2>
      )}
      
      <div className="relative mb-8 px-4 py-6 bg-white rounded-lg shadow-md">
        <FaQuoteLeft className="text-purple-300 text-3xl absolute top-2 left-2" />
        <div 
          className="text-lg md:text-xl text-gray-700 px-8 py-2 meme-text"
          dangerouslySetInnerHTML={{ 
            __html: roastText
              .split('\n\n')
              .map(paragraph => `<p class="mb-4">${paragraph}</p>`)
              .join('')
          }}
        />
        <FaQuoteRight className="text-purple-300 text-3xl absolute bottom-2 right-2" />
      </div>
      
      {isPremium && (
        <div className="mb-4">
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold">
            {isGitHubPages ? 'Demo Premium' : 'Premium Roast'}
          </span>
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        Generated on {formattedDate}
      </div>
      
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleShare}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:animate-bounce"
        >
          Share This Roast
        </button>
      </div>
    </div>
  );
};

export default RoastDisplay; 