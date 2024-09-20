// models/Plantation.js
const mongoose = require('mongoose');

const plantationSchema = new mongoose.Schema({
  plot: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  survivalRate: {
    type: Number,
    default: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('Plantation', plantationSchema);
