
// imports
const mongoose = require('mongoose');

// define schema for restaurant
const restaurantSchema = new mongoose.Schema({
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
const Restaurant = mongoose.model("restaurants", restaurantSchema);


module.exports = {
    Restaurant
}