import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { generateRoast, createCheckoutSession } from '../services/api';
import { FaSpinner } from 'react-icons/fa';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname !== 'localhost';

const RoastForm = () => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await generateRoast(name, photoUrl);
      
      if (response.success) {
        navigate(`/roast/${response.data.id}`);
      } else {
        toast.error(response.message || 'Failed to generate roast');
      }
    } catch (error) {
      console.error('Error generating roast:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePremiumRoast = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    setLoading(true);
    
    try {
      // For GitHub Pages deployment, navigate directly to success page with mock session ID
      if (isGitHubPages) {
        setTimeout(() => {
          navigate(`/success?session_id=github_pages_demo`);
          setLoading(false);
        }, 1000);
        return;
      }
      
      // For local development with backend
      const response = await createCheckoutSession(name, photoUrl);
      
      if (response.success) {
        if (response.url.startsWith('/success')) {
          // This is a mock session
          navigate(response.url);
        } else {
          // This is a real Stripe session
          window.location.href = response.url;
        }
      } else {
        toast.error(response.message || 'Failed to create checkout session');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Get Roasted by AI</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
            required
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="photoUrl" className="block text-gray-700 font-medium mb-2">
            Photo URL (Optional)
          </label>
          <input
            type="url"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://example.com/your-photo.jpg"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Add a photo URL for a more personalized roast
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            Roast Me (Free)
          </button>
          
          <button
            type="button"
            onClick={handlePremiumRoast}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {isGitHubPages ? 'Try Demo Premium Roast' : 'Get a Spicier Roast ($4.99)'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          {isGitHubPages 
            ? 'This is a demo version. Premium roasts in the full app are generated using advanced AI.' 
            : 'Premium roasts use more advanced AI for spicier, more personalized content.'}
        </p>
      </div>
    </div>
  );
};

export default RoastForm; 