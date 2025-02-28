const mongoose = require('mongoose');

const roastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  photoUrl: {
    type: String,
    trim: true
  },
  roastContent: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  paymentId: {
    type: String,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Roast', roastSchema); 