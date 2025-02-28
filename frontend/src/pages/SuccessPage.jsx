import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-6 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Premium Roasts Coming Soon!</h1>
      
      <p className="text-xl text-gray-600 mb-8">
        We're currently gauging interest in our premium roast feature before launching it.
        Thank you for your interest!
      </p>
      
      <div className="flex justify-center">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">What to expect</h3>
        <p className="text-gray-600">
          Our premium roasts will offer more personalized, spicier content created by advanced AI.
          We're working hard to bring this feature to you soon. In the meantime, you can still enjoy our free roasts!
        </p>
      </div>
    </div>
  );
};

export default SuccessPage; 