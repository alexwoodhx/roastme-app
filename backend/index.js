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

// Configure CORS - Apply to all routes BEFORE other middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://alexwoodhx.github.io',
  'https://roastme-api.onrender.com'
];

// Apply CORS to all routes except webhook (which needs raw body)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('CORS blocked for:', origin);
      callback(null, true); // Allow all origins in production for now
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
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