require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const roastRoutes = require('./routes/roastRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB!
// Check if MONGODB_URI is provided in environment variables
let uri;
if (process.env.MONGODB_URI) {
  uri = process.env.MONGODB_URI;
} else {
  // Fallback to hardcoded connection (not recommended for production)
  const username = 'woodsy366';
  const password = encodeURIComponent('Heineken211191!');
  const cluster = 'cluster0.zgknm.mongodb.net';
  const dbName = 'roastme';
  uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
}

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Handle OPTIONS requests separately - MUST be before any other middleware
app.options('*', (req, res) => {
  console.log('Received OPTIONS request');
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Respond with 200 OK
  res.sendStatus(200);
});

// Set CORS headers for all other requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Standard CORS middleware as backup
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Middleware for JSON parsing
app.use(express.json());
app.use(morgan('dev'));

// For Stripe webhook - needs raw body - must be after CORS but before express.json()
app.use('/api/webhook', webhookRoutes);

// Routes
app.use('/api', roastRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root route for easy verification
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'AI Roast Me API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
}); 