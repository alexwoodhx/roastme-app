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

// Determine which API URL to use
const API_URL = isGitHubPages ? RENDER_API_URL : LOCAL_API_URL;

// Flag to use mock data (set to true if backend is unavailable)
const USE_MOCK_DATA = isGitHubPages;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Don't send credentials for cross-origin requests
  withCredentials: false,
  // Set a timeout to fail fast if the API is not responding
  timeout: 5000
});

// Log requests in development
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url, 'to', request.baseURL);
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
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.status, error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API No Response Error:', error.request);
    console.warn('Backend appears to be unavailable. Using mock data instead.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Setup Error:', error.message);
  }
  return Promise.reject(error);
});

// Generate a basic roast
export const generateRoast = async (name, photoUrl = '') => {
  // If using mock data or if we're on GitHub Pages, return mock response
  if (USE_MOCK_DATA) {
    console.log('Using mock data for roast generation');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
    const mockId = 'mock_' + Math.random().toString(36).substring(2, 15);
    
    return {
      success: true,
      data: {
        roast: randomRoast.replace('{name}', name || 'you'),
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
    console.error('Generate Roast Error:', error.message);
    
    // Fallback to mock data on error
    console.log('Falling back to mock data due to API error');
    const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
    const mockId = 'mock_' + Math.random().toString(36).substring(2, 15);
    
    return {
      success: true,
      data: {
        roast: randomRoast.replace('{name}', name || 'you'),
        id: mockId
      }
    };
  }
};

// Create a checkout session for premium roast
export const createCheckoutSession = async (name, photoUrl = '') => {
  // If using mock data or if we're on GitHub Pages, return mock response
  if (USE_MOCK_DATA) {
    console.log('Using mock data for checkout session');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    console.error('Checkout Session Error:', error.message);
    
    // Fallback to mock data on error
    console.log('Falling back to mock data due to API error');
    return {
      success: true,
      url: '/success',
      message: 'Premium roasts coming soon'
    };
  }
};

// Get a roast by ID
export const getRoastById = async (id) => {
  // If using mock data or if we're on GitHub Pages, return mock response
  if (USE_MOCK_DATA) {
    console.log('Using mock data for roast retrieval');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    console.error('Get Roast Error:', error.message);
    
    // Fallback to mock data on error
    console.log('Falling back to mock data due to API error');
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
};

export default api; 