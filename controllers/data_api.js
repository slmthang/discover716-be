
// imports
const express = require('express');
const dataAPIRouter = express.Router();
const cloudinaryController = require('../services/cloudinary.js');
const multer  = require('multer');
const models = require('../mongoDB/models.js');
const logger = require('../utils/logger.js');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');


const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '');
  }

  return null;
}


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

// get total counts
dataAPIRouter.get('/:data/count', async (request, response) => {

  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // get total count of docs in the collection
    const count = await dataDB.countDocuments({});

    // log
    logger.info(`Fetched total count for ${request.params.data}.`);

    // send data back
    response.json({
      count
    });

  } catch (err) {

    // log errors
    logger.error("Fetching total count failed: ", err);
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
dataAPIRouter.get('/:data/info/:count/:sortBy/:sortOrder/:skipCount', async (request, response) => {
  try {

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // conditions
    const count = request.params.count;
    const sortBy = request.params.sortBy;
    const sortOrder = request.params.sortOrder;
    const skipCount = request.params.skipCount * count;

    // fetch data using the conditions
    const data = await dataDB.find({}).skip(skipCount).limit(count).sort([[sortBy, sortOrder]]).collation({ locale: 'en', strength: 2 });

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

    // get decodedToken
    const decodedToken = jwt.verify(getTokenFrom(request), config.JWT_SECRET);

    console.log("DTOKEN: ", decodedToken);

    if (!decodedToken.id) {

      return response.status(401).json({error: 'Submission failed. User not authorized. log in properly again.'})
    }

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // upload thumbnail to cloundinary
    const {public_id, secure_url} = await cloudinaryController.singleUpload(request);

    // // public_id for cloudinary image
    // const publicId = "discover716/" + request.file.originalname;

    console.log("PublicID: ", public_id);
    console.log("SEcureurl", secure_url);

    // new data object
    const newDataObject = {
      ...request.body,
      thumbnail: secure_url,
      public_id
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

    // get decodedToken
    const decodedToken = jwt.verify(getTokenFrom(request), config.JWT_SECRET);

    if (!decodedToken.id) {

      return response.status(401).json({error: 'Submission failed. User not authorized. log in properly again.'})
    }

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


    // get decodedToken
    const decodedToken = jwt.verify(getTokenFrom(request), config.JWT_SECRET);

    if (!decodedToken.id) {

      return response.status(401).json({error: 'Submission failed. User not authorized. log in properly again.'})
    }

    // select database base on data param
    const dataDB = dataType[request.params.data];

    // info
    const dataId = request.params.dataId;

    // fetch object
    const object = await dataDB.findById(dataId).exec();

    console.log("Object: ", object);
    console.log("ID: ", object.public_id);

    // delete thumbnail
    await cloudinaryController.deleteImage(object.public_id);

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



