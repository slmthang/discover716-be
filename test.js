
import {createEvent} from "mongoose.js";

// define an event object
const newEventObj = {
  title: "Cherry Blossom 5",
  date: "05/14/2024",
  startTime: "04:00 P.M",
  endTIme: "08:00 P.M",
  address: "2655 South Park Ave, Buffalo, NY 14218",
  website: "https://www.buffalogardens.com/products/open-art-nights",
  thumbnail: "thumbnail.jpg",
  description: "this is a short description",
  email: "helpdesk@gmail.com",
  phone: "716-274-7482",
  goingCount: 0
}

createEvent(newEventObj);



// define schema for event
const eventSchema = new db.Schema({
  title: String,
  date: String,
  startTime: String,
  endTIme: String,
  address: String,
  website: String,
  thumbnail: String,
  description: String,
  email: String,
  phone: String,
  goingCount: Number
})

// define model for event
const Event = db.model("events", eventSchema);


/* METHOD */

// create an event & save to db
const create = (eventObj) => {

    // event document
    const event = new Event(eventObj);

    // save event
    event.save().then(result => {
      console.log('event saved!');

      // close db
      db.connection.close();
    })
}

// fetch all the events from database
function getAll() {

    // fetch all events
    const events = await Event.find({});

    // close db
    db.connection.close();

    return events;
}


module.exports = {
  create,
  getAll
}