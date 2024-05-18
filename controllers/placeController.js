
// imports
const express = require('express');
const router = express.Router();

// Event Model - mongodb
const {Place} = require('../mongoDB/models/places.js');

// multer
const multer  = require('multer');
const upload = multer();
const cloudinaryController = require('./cloudinaryController');

// fetch all places
router.get('/places', async (request, response) => {
    try {
        const places = await Place.find({});
        response.json(places);

    } catch (err) {
        console.log("Place: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// fetch an place by id
router.get('/places/:placeId', async (request, response) => {
    try {
        // evenId
        const placeId = request.params.placeId;
        // fectch event by using id
        const place = await Place.findById(placeId);

        response.json(place);
    } catch (err) {
        console.log("Place: ", err);
        response.status(500).json({error: 'Internal Server Errror'});
    }
})


// post an event
router.post('/places', upload.single('thumbnail'), async (request, response) => {
    try {

        // upload thumbnail to cloundinary
        await cloudinaryController.singleUpload(request);

        // get url for image
        let url = await cloudinaryController.getUrl("discover716/" + request.file.originalname);

        // newPlaceObj
        const newPlaceObj = {
            ...request.body,
            thumbnail: url
        }

        console.log("newHotelObj: ", newPlaceObj);

        // create a new place document
        const place = new Place(newPlaceObj);

        // save to db
        place.save().then(() => {
            console.log("an place is saved to db!");
        })

        // response
        response.json(place);

    } catch (err) {
        console.log("Place: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// delete all events
router.delete('/places', async (request, response) => {
    try {
        // delete
        await Place.deleteMany({});
        response.json({});

    } catch (err) {
        console.log("Place: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = {
    placesController: router
}



