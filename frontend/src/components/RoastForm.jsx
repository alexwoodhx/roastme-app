import React, { useState } from 'react';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const RoastForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, photoUrl, isPremium: false });
  };

  const handlePremiumRoast = () => {
    // This is disabled for now
    // Will be implemented in the future
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-purple-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800 meme-text">
        Get Roasted! 🔥
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:transform hover:scale-[1.01]"
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="photoUrl" className="block text-gray-700 font-medium mb-2">
            Photo URL (optional)
          </label>
          <input
            type="url"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:transform hover:scale-[1.01]"
            placeholder="https://example.com/your-photo.jpg"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Add a photo URL for a more personalized roast
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Roasting...</span>
              </>
            ) : (
              <>
                <span>Roast Me!</span>
                <span className="text-xl">🔥</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handlePremiumRoast}
            disabled={true}
            className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 cursor-not-allowed opacity-80 flex items-center justify-center gap-2 group"
          >
            <span>{isGitHubPages ? 'Premium Roast' : 'Spicier Roast'}</span>
            <span className="text-xl group-hover:animate-wiggle">😉</span>
            <span className="ml-1 bg-gray-600 text-xs px-2 py-1 rounded-full">Coming Soon</span>
          </button>
        </div>
      </form>
      
      <div className="mt-6 speech-bubble">
        <p className="text-sm text-gray-600">
          <span className="font-bold">Pro Tip:</span> The more details you provide, the spicier the roast will be! 🌶️
        </p>
      </div>
    </div>
  );
};

export default RoastForm; 