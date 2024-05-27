
// import
const config = require('../utils/config');
const logger = require('./logger')

// database
const db = require('mongoose');

// db url
const url = config.DB_CONN;


// connect to DB
const connectDB = () => {
  db.connect(url)
    .then (() => {
      logger.info("Connected to MongoDB");
    })
    .catch((err) => {
      logger.error('Error connecting to MongoDB: ', err);
    });
}

module.exports = {
  connectDB
}

