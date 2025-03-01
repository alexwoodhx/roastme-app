import axios from 'axios';

// Mock roasts for fallback only when API is unavailable
const mockRoasts = [
  "Your fashion sense is as outdated as Internet Explorer. But hey, at least you're consistent!",
  "You're like a human version of Monday morning - nobody's excited to see you, but they tolerate your existence.",
  "Your cooking is so bad, even the smoke detector cheers you on.",
  "You're proof that evolution can go in reverse.",
  "Your selfies make the camera want to switch to the front-facing camera automatically.",
  "If disappointment had a face, it would ask for a paper bag to cover yours.",
  "Your personality is like a plain bagel - boring, bland, and nobody's first choice.",
  "You're not completely useless... you can always serve as a bad example!",
  "I'd roast you, but my mom said I'm not allowed to burn trash."
];

// API URLs
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://roastme-app.onrender.com/api' 
  : 'http://localhost:5000/api';

// Flag to use mock data (only for fallback)
const USE_MOCK_DATA = false;

// Create axios instance with dynamic baseURL to avoid caching issues
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 5000
});

// Log requests in development
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url, 'to', API_URL);
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
    console.error('API Error Response:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('API No Response Error:', error.request);
    console.warn('Backend appears to be unavailable. Using mock data instead.');
  } else {
    console.error('API Setup Error:', error.message);
  }
  return Promise.reject(error);
});

// Generate a basic roast
export const generateRoast = async (name, photoUrl = '') => {
  try {
    console.log('Generating roast for:', name);
    const response = await api.post('/generate-roast', { name, photoUrl });
    console.log('API response received:', response.data);
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
        id: mockId,
        isMockFallback: true
      }
    };
  }
};

// Create a checkout session for premium roast
export const createCheckoutSession = async (name, photoUrl = '') => {
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