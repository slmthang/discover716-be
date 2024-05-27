

// use dotenv
require('dotenv').config();

const db = require('mongoose');

// db url
const url = process.env.DB_CONN;


// connect to DB
const connectDB = () => {
  db.connect(url)
    .then (() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB: ', err);
    });
}

module.exports = {
  connectDB
}

