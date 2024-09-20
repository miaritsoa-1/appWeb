// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
