import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateRoast, createCheckoutSession } from '../services/api';

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
        toast.error(response.error || 'Failed to generate roast');
      }
    } catch (error) {
      console.error('Error generating roast:', error);
      toast.error(error.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handlePremiumRoast = async () => {
    toast.info('Premium roasts coming soon! We\'re gauging interest before launching this feature.');
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Get Roasted!</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="photoUrl" className="block text-gray-700 font-medium mb-2">
            Photo URL (Optional)
          </label>
          <input
            type="url"
            id="photoUrl"
            className="input"
            placeholder="https://example.com/your-photo.jpg"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Photo upload feature coming soon!
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Roast Me (Free)'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePremiumRoast}
            disabled={loading}
          >
            Get a Spicier Roast - Coming Soon!
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoastForm; 