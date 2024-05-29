
// imports
const { connectDB } = require("./mongoDB/db");
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const { dataAPIRouter } = require("./controllers/data_api");
const { authRouter } = require('./controllers/auth');


// express
const app = express();
// use cors
app.use(cors());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// express.json() & express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use static files from frontend
app.use(express.static('dist'));

// make db connection
connectDB();

// requestLogger
app.use(middleware.requestLogger);
// @routes
// api
app.use('/api', dataAPIRouter);
// auth
app.use('/auth', authRouter);

// unknown endpoint
app.use(middleware.unknownEndpoint);
// error handler
app.use(middleware.errorHandler);


// PORT 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Servering running on port ${PORT}...`)
})

module.exports = app