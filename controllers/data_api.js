
// imports
const express = require('express');
const dataAPIRouter = express.Router();
const cloudinaryController = require('../services/cloudinary.js');
const multer  = require('multer');
const models = require('../mongoDB/models.js');
const logger = require('../utils/logger.js')


// multer
const upload = multer();

// store models to object using
const dataType = {
  events: models.Event,
  hotels: models.Hotel,
  restaurants: models.Restaurant,
  places: models.Place
}

// fetch all events
dataAPIRouter.get('/:data/all', async (request, response) => {

  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // fetch data from database
    const data = await dataDB.find({});

    // log
    logger.info(`Fetched all data. (${request.params.data}).`)

    // send back data to client
    response.json(data);

  } catch (err) {

    // errors output
    logger.error("cannot fetchAll data: ", err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})


// fetch an event by id
dataAPIRouter.get('/:data/:dataId', async (request, response) => {

  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // get specific data by id
    const dataId = request.params.dataId;

    // fectch event by using id
    const data = await dataDB.findById(dataId);

    // log
    logger.info(`Fetched a specific data by ID ( ${request.params.data} ).`)

    // send back data to client
    response.json(data);

  } catch (err) {

    // errors output
    logger.error("Cannot fetch a specific data: ", err);
    response.status(500).json({ error: 'Internal Server Errror' });
  }
})


// // fetch events by conditions : type, count, sortby and sort order
dataAPIRouter.get('/:data/info/:count/:sortBy/:sortOrder', async (request, response) => {
  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // conditions
    const count = request.params.count;
    const sortBy = request.params.sortBy;
    const sortOrder = request.params.sortOrder;

    // fetch data using the conditions
    const data = await dataDB.find({}).limit(count).sort([[sortBy, sortOrder]]).collation({ locale: 'en', strength: 2 });

    // log
    logger.info(`Fetched a specific data by conditions ( ${request.params.data} ).`)

    // send back to client
    response.json(data);

  } catch (err) {

    // log errors
    logger.error("Fetching data by conditions failed: ", err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})


// post an event
dataAPIRouter.post('/:data', upload.single('thumbnail'), async (request, response) => {

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
      logger.info(`A record is saved to ${request.params.data} database.`);
    })

    // response
    response.json(dataDoc);

  } catch (err) {

    // log errors
    logger.error("Fail to save a record to database: ", err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})


// delete all events
dataAPIRouter.delete('/:data/all', async (request, response) => {

  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // delete all
    dataDB.deleteMany({}).then( data => {
      // log
      logger.info(`All records are deleted from ${request.params.data} collection.`);
    });

    response.json({});

  } catch (err) {

    // log errors
    logger.error("Attempt to delete all data in database failed: ", err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})


// delete all events
dataAPIRouter.delete('/:data/:dataId', async (request, response) => {

  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // info
    const dataId = request.params.dataId;

    // delete
    const data = await dataDB.findByIdAndDelete(dataId);

    // log
    logger.info(`${dataId} is deleted from ${request.params.data} collection.`);

    response.json(data);

  } catch (err) {

    // log errors
    logger.error("Attempt to delete specific data in database failed: ", err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = {
  dataAPIRouter
}



