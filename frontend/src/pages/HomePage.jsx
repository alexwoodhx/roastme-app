import React, { useState, useEffect } from 'react';
import RoastForm from '../components/RoastForm';
import { FaRobot, FaLaugh, FaLock, FaQuestionCircle, FaSmileWink, FaFire, FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';

// Fake celebrity endorsements component
const CelebrityEndorsements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const endorsements = [
    {
      name: "Elon Musk",
      quote: "I was going to colonize Mars, but then I got roasted so hard I decided to stay on Earth and cry.",
      title: "CEO of Space or Something"
    },
    {
      name: "Taylor Swift",
      quote: "I've written 17 breakup songs, but none hit as hard as the roast I got from this AI.",
      title: "Professional Ex-Girlfriend"
    },
    {
      name: "Gordon Ramsay",
      quote: "This AI roasts better than I do. It's RAW talent, you donkey!",
      title: "Angry Chef Man"
    },
    {
      name: "Keanu Reeves",
      quote: "Getting roasted by this AI was breathtaking... and not in a good way.",
      title: "The Internet's Boyfriend"
    },
    {
      name: "Beyoncé",
      quote: "Even I had to put my hands up after this AI roasted me.",
      title: "Queen B(ee)"
    },
    {
      name: "Dwayne 'The Rock' Johnson",
      quote: "This AI smelled what I was cooking and told me it was garbage.",
      title: "Large Muscular Person"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % endorsements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const endorsement = endorsements[currentIndex];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-md relative overflow-hidden">
      <div className="absolute top-2 right-2 flex">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>
      
      <div className="flex flex-col items-center text-center">
        <FaQuoteLeft className="text-purple-300 text-4xl mb-4" />
        
        <p className="text-lg italic text-gray-700 mb-4">
          "{endorsement.quote}"
        </p>
        
        <div className="mt-2">
          <p className="font-bold text-purple-800 text-xl">{endorsement.name}</p>
          <p className="text-sm text-gray-500">{endorsement.title}</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          {endorsements.map((_, index) => (
            <span 
              key={index} 
              className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-purple-600' : 'bg-purple-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800">
          AI Roast Me 🔥👻
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get hilariously roasted by our AI 🤖 Enter your name, add a photo URL (optional),
          and let our artificial intelligence create a personalized roast just for you! 💀
        </p>
        
        <div className="mb-12">
          <RoastForm />
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          How It Works ⚙️
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaRobot className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Enter Your Info 📝</h3>
            <p className="text-gray-600">
              Provide your name and an optional photo URL for a more personalized roast experience. 📸
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaLaugh className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Get Roasted 🔥</h3>
            <p className="text-gray-600">
              Our AI generates a humorous, personalized roast based on the information you provided. 😂
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaLock className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Share & Enjoy 🎉</h3>
            <p className="text-gray-600">
              Share your roast with friends or try again for more laughs. It's all in good fun! 🤣
            </p>
          </div>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          Celebrity "Endorsements" 🌟
        </h2>
        <CelebrityEndorsements />
        <div className="mt-3 text-xs text-gray-400 italic text-center px-4">
          <p>* Legal Disclaimer: These endorsements are about as real as your ex's promises. If you genuinely believed Elon Musk or Taylor Swift used our app, we have a bridge to sell you and some magic beans for dessert. 🧠🤏</p>
          <p className="mt-1">Anyone with an IQ exceeding room temperature knows these are jokes. The rest of you might want to check if your village is missing its you-know-what. 😉</p>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-block">
          <a 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden font-medium rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-purple-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 btn-bounce"
          >
            <span className="absolute right-0 top-0 bg-white bg-opacity-30 w-8 h-20 -mt-3 rotate-12 transform translate-x-1 -translate-y-3"></span>
            <FaFire className="text-yellow-300 animate-pulse" />
            <span>Unlock Premium Roast Tips 💯</span>
            <FaSmileWink className="text-yellow-300 group-hover:animate-wiggle" />
          </a>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <div className="speech-bubble mb-6">
          <p className="text-lg text-gray-600 font-bold">
            Ready to get absolutely destroyed? 💥 Our AI doesn't hold back! 🙈
          </p>
        </div>
        <p className="text-md text-gray-500 mt-4">
          Remember: These roasts are AI-generated and meant to be funny 🤪 Don't take them personally! 💖
        </p>
        <p className="mt-4 text-sm text-purple-600 glitch-text">
          Warning: Side effects may include bruised egos, uncontrollable laughter, and the sudden urge to question your life choices.
        </p>
      </section>
    </div>
  );
};

export default HomePage; 