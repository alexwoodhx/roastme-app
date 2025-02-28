import { useState } from 'react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  FacebookIcon, 
  TwitterIcon 
} from 'react-share';
import { toast } from 'react-toastify';

const RoastDisplay = ({ name, roast, isPremium }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = `Check out this ${isPremium ? 'premium' : ''} AI roast for ${name}!`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePremiumClick = () => {
    toast.info('Premium roasts coming soon! We\'re gauging interest before launching this feature.');
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Roast for {name}
        </h2>
        {isPremium && (
          <span className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Premium
          </span>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6 relative">
        <p className="text-gray-800 text-lg italic">"{roast}"</p>
        <button
          onClick={handleCopyToClipboard}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-.5 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm0-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm0-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Share this roast:</h3>
          <div className="flex space-x-2">
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        </div>
        
        {!isPremium && (
          <button
            onClick={handlePremiumClick}
            className="btn btn-secondary"
          >
            Premium Roasts Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default RoastDisplay; 