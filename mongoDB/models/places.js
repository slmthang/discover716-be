
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
        default: "https://res.cloudinary.com/dxjfmwr5n/image/upload/v1716049553/discover716/error/no-image_v7nvfz.png"
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
        default: "000-000-0000"
    },
    email: {
        type: String,
        default: "N/A"
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