

// use dotenv
require('dotenv').config();

const db = require('mongoose');

// db url
const url = process.env.DB_CONN;


// connect to DB
const connectDB = () => {
  db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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

