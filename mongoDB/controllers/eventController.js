
// imports
const express = require('express');
const router = express.Router();
const {Event} = require('../models/Event');


// fetch all events
router.get('/events', async (request, response) => {
    try {
        const events = await Event.find({});
        response.json(events);
    } catch (err) {
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// post an event
router.post('/events', async (request, response) => {
    try {
        // sample event object
        // const newEventObj = {
        //     title: "Cherry Blossom 200",
        //     date: "05/14/2024",
        //     startTime: "04:00 P.M",
        //     endTIme: "08:00 P.M",
        //     address: "2655 South Park Ave, Buffalo, NY 14218",
        //     website: "https://www.buffalogardens.com/products/open-art-nights",
        //     thumbnail: "thumbnail.jpg",
        //     description: "this is a short description",
        //     email: "helpdesk@gmail.com",
        //     phone: "716-274-7482",
        //     goingCount: 0
        // }

        const newEventObj = request.body;

        // create a new event document
        const event = new Event(newEventObj);

        // save to db
        event.save().then(() => {
            console.log("an event is saved to db!");
        })

        // response
        response.json(event);
    } catch (err) {
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



