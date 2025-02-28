import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getRoastById } from '../services/api';
import RoastDisplay from '../components/RoastDisplay';
import { FaSpinner, FaCopy, FaHome } from 'react-icons/fa';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      toast.error('No session ID found');
      navigate('/');
      return;
    }

    const fetchRoast = async () => {
      try {
        // For GitHub Pages deployment, simulate a delay and return mock data
        if (isGitHubPages) {
          setTimeout(() => {
            setRoastData({
              name: 'Demo User',
              roast: "Your selfies make the camera want to switch to the front-facing camera automatically. But don't worry, at least your personality is just as filtered!",
              isPremium: true,
              createdAt: new Date().toISOString()
            });
            setLoading(false);
          }, 2000);
          return;
        }

        // For local development with backend
        if (sessionId.startsWith('mock_sess_')) {
          // This is a mock session, simulate a delay
          setTimeout(async () => {
            const response = await getRoastById('mock_premium');
            if (response.success) {
              setRoastData(response.data);
            } else {
              toast.error('Failed to generate roast');
            }
            setLoading(false);
          }, 2000);
        } else {
          // Real Stripe session, wait for webhook to process
          setTimeout(async () => {
            try {
              const response = await getRoastById(sessionId);
              if (response.success) {
                setRoastData(response.data);
              } else {
                toast.error('Failed to retrieve roast');
              }
            } catch (error) {
              console.error('Error fetching roast:', error);
              toast.error('Error retrieving your roast. Please try again.');
            } finally {
              setLoading(false);
            }
          }, 3000);
        }
      } catch (error) {
        console.error('Error in success page:', error);
        toast.error('Something went wrong');
        setLoading(false);
      }
    };

    fetchRoast();
  }, [searchParams, navigate]);

  const handleCopySessionId = () => {
    const sessionId = searchParams.get('session_id');
    navigator.clipboard.writeText(sessionId)
      .then(() => toast.success('Session ID copied to clipboard'))
      .catch(() => toast.error('Failed to copy session ID'));
  };

  const handleGenerateAnother = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
          {isGitHubPages ? 'Demo Premium Roast' : 'Payment Successful!'}
        </h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="animate-spin text-4xl text-purple-600 mb-4" />
            <p className="text-gray-600 text-lg">
              {isGitHubPages 
                ? 'Generating your demo premium roast...' 
                : 'Processing your payment and generating your premium roast...'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-green-600 text-xl mb-4">
                {isGitHubPages 
                  ? 'Here\'s your demo premium roast!' 
                  : 'Your payment was successful and your premium roast is ready!'}
              </p>
              <p className="text-gray-600 mb-4">
                {isGitHubPages 
                  ? 'This is a demo version. In the full app, premium roasts are generated using AI.' 
                  : 'We\'ve used our advanced AI to create a personalized premium roast just for you.'}
              </p>
            </div>

            {roastData && <RoastDisplay roast={roastData} />}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={handleGenerateAnother}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                <FaHome /> Generate Another Roast
              </button>
              
              {!isGitHubPages && (
                <button
                  onClick={handleCopySessionId}
                  className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  <FaCopy /> Copy Session ID
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage; 