
// imports
const express = require('express');
const router = express.Router();

// Event Model - mongodb
const {Hotel} = require('../mongoDB/models/hotel.js');

// multer
const multer  = require('multer');
const upload = multer();
const cloudinaryController = require('./cloudinaryController');

// fetch all events
router.get('/hotels', async (request, response) => {
    try {
        const hotels = await Hotel.find({});
        response.json(hotels);
    } catch (err) {
        console.log("Hotel: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// fetch an event by id
router.get('/hotels/:hotelId', async (request, response) => {
    try {


        // evenId
        const hotelId = request.params.hotelId;
        // fectch event by using id
        const hotel = await Hotel.findById(hotelId);

        response.json(hotel);
    } catch (err) {
        console.log("Hotel: ", err);
        response.status(500).json({error: 'Internal Server Errror'});
    }
})


// post an event
router.post('/hotels', upload.single('thumbnail'), async (request, response) => {
    try {

        // upload thumbnail to cloundinary
        await cloudinaryController.singleUpload(request);

        // get url for image
        let url = await cloudinaryController.getUrl("discover716/" + request.file.originalname);

        // newEventObj
        const newHotelObj = {
            ...request.body,
            thumbnail: url
        }

        console.log("newHotelObj: ", newHotelObj);

        // create a new event document
        const hotel = new Hotel(newHotelObj);

        // save to db
        hotel.save().then(() => {
            console.log("an hotel is saved to db!");
        })

        // response
        response.json(hotel);

    } catch (err) {
        console.log("Hotel: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// delete all events
router.delete('/hotels', async (request, response) => {
    try {
        // delete
        await Hotel.deleteMany({});
        response.json({});
    } catch (err) {
        console.log("Hotel: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = {
    hotelController: router
}



