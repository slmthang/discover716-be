
// imports
const mongoose = require('mongoose');

// define schema for hotel
const hotelSchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    address: String,
    website: String,
    phone: String,
    email: String,
    about: String,
    amenities: Array
})

// define model for event
const Hotel = mongoose.model("hotels", hotelSchema);


module.exports = {
    Hotel
}