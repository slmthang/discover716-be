// const middleware = require('./utils/middleware')
// const express = require('express');
// const cors = require('cors');
const jwt = require('jsonwebtoken');


// //express
// const app = express();
// // use cors
// app.use(cors());
// // express.json() & express.urlencoded()
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));




const token = jwt.sign({"123": "lfsd"}, "123");

console.log(token);

// console.log();

// const decode = jwt.verify(token, "13");

// console.log(decode);