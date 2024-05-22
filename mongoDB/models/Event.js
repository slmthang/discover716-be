
// imports
const mongoose = require('mongoose');

// define schema for event
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ""
  },
  thumbnail: {
    type: String,
    required: true
  },
  about: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  goingCount: {
    type: Number,
    default: 0
  }
})

// define model for event
const Event = mongoose.model("events", eventSchema);


module.exports = {
    Event
}