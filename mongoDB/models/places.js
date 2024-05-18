
// imports
const mongoose = require('mongoose');

// define schema for placesToVisit
const placesToVisitSchema = new mongoose.Schema({
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
const Place = mongoose.model("places", placesToVisitSchema);


module.exports = {
    Place
}