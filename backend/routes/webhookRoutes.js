const express = require('express');
const router = express.Router();
const roastController = require('../controllers/roastController');

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), roastController.handleWebhook);

module.exports = router; 