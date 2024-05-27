
// imports
const { connectDB } = require("./mongoDB/db");
const express = require('express');
const cors = require('cors');
const utils = require('./utils/utils');

// data controller
const { dataController } = require("./api/dataController");

// use express
const app = express();

// requestLogger
app.use(utils.requestLogger);

// use cors
app.use(cors());

// express.json() & express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make db connection
connectDB();


// use static files from frontend
app.use(express.static('dist'));


/* ROUTES */

// root
app.get("/", (request, response) => {

  //  ressponse.status(200).send('OK');
  response.sendStatus(200);
});

// api
app.use('/api', dataController);

// unknown endpoint
app.use(utils.unknownEndpoint);

// error handler
app.use(utils.errorHandler);


// PORT 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("listerning @", PORT);
})