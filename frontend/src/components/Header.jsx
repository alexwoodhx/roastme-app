import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/flame.svg" alt="AI Roast Me Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-secondary-600">AI</span> Roast Me
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-secondary-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <a 
                href="https://github.com/yourusername/roastme-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-secondary-600 font-medium"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 