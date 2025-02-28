import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getRoastById } from '../services/api';
import RoastDisplay from '../components/RoastDisplay';
import { FaSpinner, FaHome, FaFire } from 'react-icons/fa';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const RoastPage = () => {
  const { id } = useParams();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoast = async () => {
      try {
        // For GitHub Pages deployment, simulate a delay and return mock data
        if (isGitHubPages) {
          setTimeout(() => {
            setRoastData({
              name: 'Demo User',
              roast: "Your fashion sense is as outdated as Internet Explorer. But hey, at least you're consistent!",
              isPremium: false,
              createdAt: new Date().toISOString()
            });
            setLoading(false);
          }, 1000);
          return;
        }

        // For local development with backend
        const response = await getRoastById(id);
        
        if (response.success) {
          setRoastData(response.data);
        } else {
          setError(response.message || 'Failed to fetch roast');
        }
      } catch (error) {
        console.error('Error fetching roast:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoast();
  }, [id]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGetPremium = () => {
    if (isGitHubPages) {
      navigate('/success?session_id=github_pages_demo');
    } else {
      navigate('/');
      setTimeout(() => {
        toast.success('Try our premium roast option!');
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-4xl text-purple-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading your roast...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={handleGoHome}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {roastData && <RoastDisplay roast={roastData} />}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            <FaHome /> Generate Another Roast
          </button>
          
          {!roastData?.isPremium && (
            <button
              onClick={handleGetPremium}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <FaFire /> 
              {isGitHubPages ? 'Try Demo Premium Roast' : 'Get a Spicier Roast ($4.99)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoastPage; 