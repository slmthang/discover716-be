
// imports
const mongoose = require('mongoose');

// define schema for restaurant
const restaurantSchema = new mongoose.Schema({
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
    }
})

// define model for event
const Restaurant = mongoose.model("restaurants", restaurantSchema);


module.exports = {
    Restaurant
}