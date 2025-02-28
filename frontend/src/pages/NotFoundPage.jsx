import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSadTear } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <FaSadTear className="text-6xl text-purple-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Even our AI is confused by this one.
        </p>
        
        <button
          onClick={handleGoHome}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mx-auto"
        >
          <FaHome /> Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage; 