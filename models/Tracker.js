const mongoose = require('mongoose');

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
  title: {
    type: String,
  },
  trackerId: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('tracker', TrackerSchema);
