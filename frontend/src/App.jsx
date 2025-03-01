import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RoastPage from './pages/RoastPage';
import SuccessPage from './pages/SuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'linear-gradient(to right, #ffcc00, #ff6699)',
            color: '#fff',
            fontWeight: 'bold',
            border: '2px dashed #fff',
            borderRadius: '10px',
          },
        }}
      />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-yellow-400 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-pink-400 animate-ping"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-blue-400 animate-bounce"></div>
        </div>
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roast/:id" element={<RoastPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 