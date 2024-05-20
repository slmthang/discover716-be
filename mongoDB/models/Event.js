
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
    default: "https://res.cloudinary.com/dxjfmwr5n/image/upload/v1716049553/discover716/error/no-image_v7nvfz.png"
  },
  about: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: "N/A"
  },
  phone: {
    type: String,
    default: "000-000-0000"
  },
  goingCount: {
    type: String,
    default: 0
  }
})

// define model for event
const Event = mongoose.model("events", eventSchema);


module.exports = {
    Event
}