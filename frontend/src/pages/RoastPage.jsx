import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import RoastDisplay from '../components/RoastDisplay';
import { getRoastById } from '../services/api';
import confetti from 'canvas-confetti';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const RoastPage = () => {
  const { id } = useParams();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoast = async () => {
      try {
        const response = await getRoastById(id);
        
        if (response.success) {
          setRoastData(response.data);
          // Trigger confetti when roast loads
          triggerConfetti();
        } else {
          setError(response.message || 'Failed to load roast');
        }
      } catch (err) {
        console.error('Error loading roast:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoast();
  }, [id]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#9333ea', '#6366f1', '#ec4899', '#f97316'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Roast Me',
        text: `Check out this AI roast for ${roastData.name}: "${roastData.roast.substring(0, 100)}..."`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully'))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error('Failed to share');
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(`AI Roast for ${roastData.name}: "${roastData.roast}" - ${window.location.href}`)
        .then(() => toast.success('Copied to clipboard'))
        .catch(() => toast.error('Failed to copy'));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg text-gray-700">Loading your roast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center">
          <FaHome className="mr-2" /> Go back home
        </Link>
      </div>
    );
  }

  if (!roastData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4">
          <p>Roast not found. It may have been deleted or never existed.</p>
        </div>
        <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center">
          <FaHome className="mr-2" /> Go back home
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(roastData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <button
          onClick={() => triggerConfetti()}
          className="text-purple-600 hover:text-purple-800 text-sm"
        >
          🎉 Celebrate Again
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <RoastDisplay 
          name={roastData.name}
          roastText={roastData.roast}
          isPremium={roastData.isPremium}
          formattedDate={formattedDate}
          isGitHubPages={isGitHubPages}
          handleShare={handleShare}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 text-center"
        >
          Get Another Roast
        </Link>
        
        <button
          disabled={true}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 cursor-not-allowed opacity-80"
        >
          <span>{isGitHubPages ? 'Premium Roast' : 'Spicier Roast'}</span>
          <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">Coming Soon</span>
        </button>
      </div>
    </div>
  );
};

export default RoastPage; 