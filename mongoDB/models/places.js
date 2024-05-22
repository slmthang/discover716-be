
// imports
const mongoose = require('mongoose');

// define schema for placesToVisit
const placesToVisitSchema = new mongoose.Schema({
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
const Place = mongoose.model("places", placesToVisitSchema);


module.exports = {
    Place
}