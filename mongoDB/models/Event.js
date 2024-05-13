
// imports
const mongoose = require('mongoose');

// define schema for event
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  startTime: String,
  endTime: String,
  address: String,
  website: String,
  thumbnail: String,
  description: String,
  email: String,
  phone: String,
  goingCount: Number
})

// define model for event
const Event = mongoose.model("events", eventSchema);


module.exports = {
    Event
}