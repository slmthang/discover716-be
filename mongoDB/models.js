
// imports
const mongoose = require('mongoose');

// define schema for event
const dataSchema1 = new mongoose.Schema({

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
  },
  public_id: {
    type: String,
    required: true
  }
})

// define schema for hotel, place, restaurants
const dataSchema2 = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
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
  phone: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ""
  },
  amenities: {
    type: Array,
    default: []
  },
  public_id: {
    type: String,
    required: true
  }
})

// define schema for hotel, place, restaurants
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})


// define models
const Event = mongoose.model("events", dataSchema1);
const Restaurant = mongoose.model("restaurants", dataSchema2);
const Place = mongoose.model("places", dataSchema2);
const Hotel = mongoose.model("hotels", dataSchema2);
const User = mongoose.model("users", userSchema);

module.exports = {
  Event,
  Restaurant,
  Place,
  Hotel,
  User
}