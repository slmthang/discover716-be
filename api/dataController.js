
// imports
const express = require('express');
const router = express.Router();

// models - moongoose db
const models = require('../mongoDB/models.js');

// multer
const multer  = require('multer');
const upload = multer();
const cloudinaryController = require('../services/cloudinaryController.js');


// store models to object using
const dataType = {
    events: models.Event,
    hotels: models.Hotel,
    restaurants: models.Restaurant,
    places: models.Place
}

// fetch all events
router.get('/:data/all', async (request, response) => {

    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // fetch data from database
        const data = await dataDB.find({});

        // send back data to client
        response.json(data);

    } catch (err) {

        // errors output
        console.error("cannot fetchAll data: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// fetch an event by id
router.get('/:data/:dataId', async (request, response) => {
    
    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // get specific data by id
        const dataId = request.params.dataId;

        // fectch event by using id
        const data = await dataDB.findById(dataId);

        // send back data to client
        response.json(data);

    } catch (err) {

        // errors output
        console.error("Cannot fetch a specific data: ", err);
        response.status(500).json({error: 'Internal Server Errror'});
    }
})

// // fetch events by conditions : type, count, sortby and sort order
router.get('/:data/info/:count/:sortBy/:sortOrder', async (request, response) => {
    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // conditions
        const count = request.params.count || 1;
        const sortBy = request.params.sortBy || "name";
        const sortOrder = request.params.sortOrder || "asc";

        // fetch data using the conditions
        const data = await dataDB.find({}).limit(count).sort([[sortBy, sortOrder]]);

        // send back to client
        response.json(data);

    } catch (err) {

        // log errors
        console.error("Fetching data by conditions failed: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})



// post an event
router.post('/:data', upload.single('thumbnail'), async (request, response) => {

    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // upload thumbnail to cloundinary
        await cloudinaryController.singleUpload(request);

        // get url for image
        let url = await cloudinaryController.getUrl("discover716/" + request.file.originalname);

        // new data object
        const newDataObject = {
            ...request.body,
            thumbnail: url
        }

        // create a new event document
        const dataDoc = new dataDB(newDataObject);

        // save to db
        dataDoc.save().then(() => {
            console.log(`a record is saved to ${request.params.data} database.`);
        })

        // response
        response.json(dataDoc);

    } catch (err) {

        // log errors
        console.error("Fail to save a record to database: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})


// delete all events
router.delete('/:data/all', async (request, response) => {

    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // delete all 
        dataDB.deleteMany({}).then( data => {
            // log
            console.log(`All records are deleted from ${request.params.data} collection.`);
        });

        response.json({});

    } catch (err) {

        // log errors
        console.error("Attempt to delete all data in database failed: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

// delete all events
router.delete('/:data/:dataId', async (request, response) => {

    try {

        // select database base on data param
        const dataDB = dataType[request.params.data];

        // info
        const dataId = request.params.dataId;

        // delete
        const data = await dataDB.findByIdAndDelete(dataId);

        // log
        console.log(`${dataId} is deleted from ${request.params.data} collection.`);

        response.json(data);

    } catch (err) {

        // log errors
        console.error("Attempt to delete specific data in database failed: ", err);
        response.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = {
    dataController: router
}



