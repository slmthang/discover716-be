
// imports
const express = require('express');
const router = express.Router();
const {Event} = require('../mongoDB/models/Event');
// multer
const multer  = require('multer');
const upload = multer();
// cloudinaryController
const cloudinaryController = require('./cloudinaryController');

// fetch all events
router.get('/events', async (request, response) => {
    try {
        const events = await Event.find({});
        response.json(events);
    } catch (err) {
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// fetch an event by id
router.get('/events/:eventId', async (request, response) => {
    try {


        // evenId
        const eventId = request.params.eventId;
        // fectch event by using id
        const event = await Event.findById(eventId);

        response.json(event);
    } catch (err) {
        response.status(500).json({error: 'Internal Server Errror'});
    }
})


// post an event
router.post('/events', upload.single('thumbnail'), async (request, response) => {
    try {

        // upload thumbnail to cloundinary
        let x = await cloudinaryController.singleUpload(request);

        // get url for image
        let url = await cloudinaryController.getUrl("discover716/" + request.file.originalname);

        // newEventObj
        const newEventObj = {
            ...request.body,
            thumbnail: url
        }

        console.log("newEventObj: ", newEventObj);

        // create a new event document
        const event = new Event(newEventObj);

        // save to db
        event.save().then(() => {
            console.log("an event is saved to db!");
        })

        // response
        response.json(event);

        console.log("END");
    } catch (err) {
        console.log("??: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// delete all events
router.delete('/events', async (request, response) => {
    try {
        // delete
        await Event.deleteMany({});
        response.json({});
    } catch (err) {
        response.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = {
    eventController: router
}



