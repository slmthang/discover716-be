
// imports
const {connectDB} = require("./mongoDB/db");
const express = require('express');

// controllers
const {eventController} = require("./controllers/eventController");
const {hotelController} = require("./controllers/hotelController");
const {placesController} = require("./controllers/placeController");
const {restaurantController} = require("./controllers/restaurantController");

const cors = require('cors');
const cloudinaryController = require('./controllers/cloudinaryController');


// use express
const app = express();

// use cors
app.use(cors());

// express.json() & express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// make db connection
connectDB();


// use static files from frontend
app.use(express.static('dist'));


/* ROUTES */

// api
app.use('/api', eventController);
app.use('/api', hotelController);
app.use('/api', restaurantController);
app.use('/api', placesController);

// PORT 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("listerning @", PORT);
})