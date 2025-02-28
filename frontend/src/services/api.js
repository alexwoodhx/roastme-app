import axios from 'axios';

const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate a basic roast
export const generateRoast = async (name, photoUrl = '') => {
  try {
    const response = await api.post('/generate-roast', { name, photoUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to generate roast' };
  }
};

// Create a checkout session for premium roast
export const createCheckoutSession = async (name, photoUrl = '') => {
  try {
    const response = await api.post('/create-checkout-session', { name, photoUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create checkout session' };
  }
};

// Get a roast by ID
export const getRoastById = async (id) => {
  try {
    const response = await api.get(`/roast/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch roast' };
  }
};

export default api; 