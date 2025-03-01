import React from 'react';
import RoastForm from '../components/RoastForm';
import { FaRobot, FaLaugh, FaLock, FaQuestionCircle, FaSmileWink } from 'react-icons/fa';

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
      
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400 hover:text-funky-pink transition-colors">
          <a 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 group"
          >
            <span className="group-hover:underline">Need help with roasts?</span>
            <FaSmileWink className="text-lg opacity-70 group-hover:animate-wiggle" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 