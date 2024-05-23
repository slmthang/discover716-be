
// imports
const {connectDB} = require("./mongoDB/db");
const express = require('express');

// data controller
const {dataController} = require("./api/dataController");

const cors = require('cors');


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

// root
app.get("/", (request, response) => {

    //  ressponse.status(200).send('OK');
    response.sendStatus(200);
});

// api
app.use('/api', dataController);

// PORT 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("listerning @", PORT);
})