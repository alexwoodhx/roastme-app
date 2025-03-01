import axios from 'axios';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Use mock data for GitHub Pages deployment if no backend is available
const mockRoasts = [
  "Your fashion sense is as outdated as Internet Explorer. But hey, at least you're consistent!",
  "You're like a human version of Monday morning - nobody's excited to see you, but they tolerate your existence.",
  "Your cooking is so bad, even the smoke detector cheers you on.",
  "You're proof that evolution can go in reverse.",
  "Your selfies make the camera want to switch to the front-facing camera automatically."
];

// API URLs
const LOCAL_API_URL = '/api';
const RENDER_API_URL = 'https://roastme-api.onrender.com/api';

// CORS Proxy URLs - use these to bypass CORS restrictions
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const CORSPROXY_IO = 'https://corsproxy.io/?';

// Determine which API URL to use
const API_URL = isGitHubPages 
  ? `${CORSPROXY_IO}${encodeURIComponent(RENDER_API_URL)}`
  : LOCAL_API_URL;

// Flag to use mock data (set to false once backend is deployed)
const USE_MOCK_DATA = isGitHubPages && false; // Change to false after backend deployment

// Create axios instance with CORS configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Required by some CORS proxies
  },
  withCredentials: false // Set to true if you need cookies/auth to be sent
});

// Log requests in development
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url, request.baseURL);
  return request;
}, error => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

// Log responses in development
api.interceptors.response.use(response => {
  console.log('API Response:', response.status, response.config.url);
  return response;
}, error => {
  console.error('API Response Error:', error.response || error);
  return Promise.reject(error);
});

// Generate a basic roast
export const generateRoast = async (name, photoUrl = '') => {
  // If using mock data, return mock response
  if (USE_MOCK_DATA) {
    const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
    const mockId = 'mock_' + Math.random().toString(36).substring(2, 15);
    
    return {
      success: true,
      data: {
        roast: randomRoast.replace('{name}', name),
        id: mockId
      }
    };
  }
  
  // Otherwise, use the real API
  try {
    console.log('Generating roast for:', name, 'at URL:', `${API_URL}/generate-roast`);
    const response = await api.post('/generate-roast', { name, photoUrl });
    return response.data;
  } catch (error) {
    console.error('Generate Roast Error:', error.response?.data || error.message || error);
    
    // If we get a CORS error, try using mock data as fallback
    if (error.message === 'Network Error' && isGitHubPages) {
      console.log('Falling back to mock data due to CORS error');
      const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
      const mockId = 'mock_' + Math.random().toString(36).substring(2, 15);
      
      return {
        success: true,
        data: {
          roast: randomRoast.replace('{name}', name),
          id: mockId
        }
      };
    }
    
    throw error.response?.data || { error: 'Failed to generate roast' };
  }
};

// Create a checkout session for premium roast
export const createCheckoutSession = async (name, photoUrl = '') => {
  // If using mock data, return mock response
  if (USE_MOCK_DATA) {
    return {
      success: true,
      url: '/success',
      message: 'Premium roasts coming soon'
    };
  }
  
  // Otherwise, use the real API
  try {
    console.log('Creating checkout session for:', name);
    const response = await api.post('/create-checkout-session', { name, photoUrl });
    return response.data;
  } catch (error) {
    console.error('Checkout Session Error:', error.response?.data || error.message || error);
    
    // If we get a CORS error, try using mock data as fallback
    if (error.message === 'Network Error' && isGitHubPages) {
      console.log('Falling back to mock data due to CORS error');
      return {
        success: true,
        url: '/success',
        message: 'Premium roasts coming soon'
      };
    }
    
    throw error.response?.data || { error: 'Failed to create checkout session' };
  }
};

// Get a roast by ID
export const getRoastById = async (id) => {
  // If using mock data, return mock response
  if (USE_MOCK_DATA) {
    const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
    
    return {
      success: true,
      data: {
        name: 'Demo User',
        roast: randomRoast,
        isPremium: false,
        createdAt: new Date().toISOString()
      }
    };
  }
  
  // Otherwise, use the real API
  try {
    console.log('Getting roast by ID:', id);
    const response = await api.get(`/roast/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get Roast Error:', error.response?.data || error.message || error);
    
    // If we get a CORS error, try using mock data as fallback
    if (error.message === 'Network Error' && isGitHubPages) {
      console.log('Falling back to mock data due to CORS error');
      const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
      
      return {
        success: true,
        data: {
          name: 'Demo User',
          roast: randomRoast,
          isPremium: false,
          createdAt: new Date().toISOString()
        }
      };
    }
    
    throw error.response?.data || { error: 'Failed to fetch roast' };
  }
};

export default api; 