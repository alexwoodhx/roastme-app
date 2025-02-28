import RoastForm from '../components/RoastForm';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Get <span className="text-secondary-600">Roasted</span> by AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enter your name and our AI will generate a hilarious, personalized roast just for you. 
          Want something spicier? Upgrade to our premium roast!
        </p>
      </div>
      
      <div className="mb-12">
        <RoastForm />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-primary-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Free Roasts</h3>
          <p className="text-gray-600">
            Get a light-hearted, humorous roast completely free. Perfect for a quick laugh!
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-secondary-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Premium Roasts</h3>
          <p className="text-gray-600">
            Upgrade to our premium roast for a spicier, more creative experience. Only $4.99!
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-primary-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Share with Friends</h3>
          <p className="text-gray-600">
            Easily share your roast on social media and spread the laughter with friends!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 