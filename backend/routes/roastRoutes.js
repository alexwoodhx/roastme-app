const express = require('express');
const router = express.Router();
const roastController = require('../controllers/roastController');

// Generate a basic roast
router.post('/generate-roast', roastController.generateRoast);

// Generate a premium roast (after payment)
router.post('/generate-premium-roast', roastController.generatePremiumRoast);

// Create a Stripe checkout session
router.post('/create-checkout-session', roastController.createCheckoutSession);

// Get a roast by ID
router.get('/roast/:id', roastController.getRoastById);

module.exports = router; 