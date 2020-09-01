const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TrackerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
  },
  trackerId: {
    type: String,
    // unique: true,
    default: uuidv4(),
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('tracker', TrackerSchema);
