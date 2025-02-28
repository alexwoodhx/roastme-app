require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const roastRoutes = require('./routes/roastRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// Use encodeURIComponent for the password to handle special characters
const username = 'woodsy366';
const password = encodeURIComponent('Heineken211191!');
const cluster = 'cluster0.zgknm.mongodb.net';
const dbName = 'roastme';

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
// For Stripe webhook - needs raw body
app.use('/api/webhook', webhookRoutes);

// For regular routes
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', roastRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
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
  console.log(`Server running on port ${PORT}`);
}); 