const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} AI Roast Me. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-secondary-600 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-secondary-600 text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-secondary-600 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Powered by OpenAI GPT. This app is for entertainment purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 