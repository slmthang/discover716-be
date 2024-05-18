
// imports
const express = require('express');
const router = express.Router();

// Event Model - mongodb
const {Restaurant} = require('../mongoDB/models/restaurant.js');

// multer
const multer  = require('multer');
const upload = multer();
const cloudinaryController = require('./cloudinaryController');

// fetch all restaurants
router.get('/restaurants', async (request, response) => {
    try {
        const restaurants = await Restaurant.find({});
        response.json(restaurants);

    } catch (err) {
        console.log("Restaurant: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// fetch by restaurant id
router.get('/restaurants/:restaurantId', async (request, response) => {
    try {
        // evenId
        const restaurantId = request.params.restaurantId;

        // fectch event by using id
        const restaurant = await Restaurant.findById(restaurantId);

        response.json(restaurant);

    } catch (err) {
        console.log("Restaurant: ", err);
        response.status(500).json({error: 'Internal Server Errror'});
    }
})


// post an event
router.post('/restaurants', upload.single('thumbnail'), async (request, response) => {
    try {

        // upload thumbnail to cloundinary
        await cloudinaryController.singleUpload(request);

        // get url for image
        let url = await cloudinaryController.getUrl("discover716/" + request.file.originalname);

        // newEventObj
        const newRestaurantObj = {
            ...request.body,
            thumbnail: url
        }

        console.log("newRestaurantObj: ", newRestaurantObj);

        // create a new event document
        const restaurant = new Restaurant(newRestaurantObj);

        // save to db
        restaurant.save().then(() => {
            console.log("an restaurant is saved to db!");
        })

        // response
        response.json(restaurant);

    } catch (err) {

        console.log("Restaurant: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// delete all events
router.delete('/restaurants', async (request, response) => {
    try {
        // delete
        await Restaurant.deleteMany({});
        response.json({});

    } catch (err) {
        console.log("Restaurant: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = {
    restaurantController: router
}



