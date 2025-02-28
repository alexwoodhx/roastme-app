import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-6 text-secondary-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage; 