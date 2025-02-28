import React from 'react';
import RoastForm from '../components/RoastForm';
import { FaRobot, FaLaugh, FaLock } from 'react-icons/fa';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname !== 'localhost';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800">
          AI Roast Me
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get hilariously roasted by our AI. Enter your name, add a photo URL (optional),
          and let our artificial intelligence create a personalized roast just for you!
        </p>
        
        <div className="mb-12">
          <RoastForm />
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaRobot className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Enter Your Info</h3>
            <p className="text-gray-600">
              Provide your name and an optional photo URL for a more personalized roast experience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaLaugh className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Get Roasted</h3>
            <p className="text-gray-600">
              Our AI generates a humorous, personalized roast based on the information you provided.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaLock className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Share & Enjoy</h3>
            <p className="text-gray-600">
              Share your roast with friends or try again for more laughs. It's all in good fun!
            </p>
          </div>
        </div>
      </section>
      
      {isGitHubPages && (
        <section className="max-w-4xl mx-auto mb-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">
            GitHub Pages Demo
          </h2>
          <p className="text-gray-700 mb-2">
            You're viewing the demo version of AI Roast Me deployed on GitHub Pages. This version uses mock data instead of real API calls.
          </p>
          <p className="text-gray-700">
            For the full experience with real AI-generated roasts, check out the <a href="https://github.com/alexwoodtech/roastme-app" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">GitHub repository</a> and follow the setup instructions.
          </p>
        </section>
      )}
    </div>
  );
};

export default HomePage; 