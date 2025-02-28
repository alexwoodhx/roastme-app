import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRoastById } from '../services/api';
import RoastDisplay from '../components/RoastDisplay';

const RoastPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [roastData, setRoastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoast = async () => {
      try {
        const response = await getRoastById(id);
        
        if (response.success) {
          setRoastData(response.data);
        } else {
          setError(response.error || 'Failed to fetch roast');
        }
      } catch (error) {
        setError(error.error || 'Something went wrong');
        toast.error(error.error || 'Failed to fetch roast');
      } finally {
        setLoading(false);
      }
    };

    fetchRoast();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  if (error || !roastData) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error || 'Could not find the requested roast'}</p>
        <Link to="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="text-primary-600 hover:text-primary-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      <RoastDisplay 
        name={roastData.name}
        roast={roastData.roast}
        isPremium={roastData.isPremium}
      />
    </div>
  );
};

export default RoastPage; 