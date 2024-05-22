
// imports
const mongoose = require('mongoose');

// define schema for hotel
const hotelSchema = new mongoose.Schema({
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
const Hotel = mongoose.model("hotels", hotelSchema);


module.exports = {
    Hotel
}