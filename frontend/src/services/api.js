import axios from 'axios';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Use mock data for GitHub Pages deployment
const mockRoasts = [
  "Your fashion sense is as outdated as Internet Explorer. But hey, at least you're consistent!",
  "You're like a human version of Monday morning - nobody's excited to see you, but they tolerate your existence.",
  "Your cooking is so bad, even the smoke detector cheers you on.",
  "You're proof that evolution can go in reverse.",
  "Your selfies make the camera want to switch to the front-facing camera automatically."
];

// API URL - use relative path for local development, mock for GitHub Pages
const API_URL = isGitHubPages ? null : '/api';

// Create axios instance for local development
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate a basic roast
export const generateRoast = async (name, photoUrl = '') => {
  // If on GitHub Pages, return mock data
  if (isGitHubPages) {
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
    const response = await api.post('/generate-roast', { name, photoUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to generate roast' };
  }
};

// Create a checkout session for premium roast
export const createCheckoutSession = async (name, photoUrl = '') => {
  // If on GitHub Pages, return mock data
  if (isGitHubPages) {
    return {
      success: true,
      url: '/success',
      message: 'Premium roasts coming soon'
    };
  }
  
  // Otherwise, use the real API
  try {
    const response = await api.post('/create-checkout-session', { name, photoUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create checkout session' };
  }
};

// Get a roast by ID
export const getRoastById = async (id) => {
  // If on GitHub Pages, return mock data
  if (isGitHubPages) {
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
    const response = await api.get(`/roast/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch roast' };
  }
};

export default api; 