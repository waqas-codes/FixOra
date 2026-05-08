const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  skill: {
    type: String,
    required: [true, 'Please select a skill']
  },
  age: {
    type: Number,
    required: [true, 'Please add an age']
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy'],
    default: 'Available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema);
