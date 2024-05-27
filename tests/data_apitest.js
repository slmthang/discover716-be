
const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose');
const models = require('../mongoDB/models');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


const data = [
  {
    name: "Trombone Shorty & Orleans Avenue",
    date: "2024-06-22",
    startTime: "18:30",
    endTime: "22:30",
    address: "450 S. Fourth St., Lewiston 14092",
    website: "https://www.artpark.net/",
    thumbnail: "http://res.cloudinary.com/dxjfmwr5n/image/upload/v1716406407/discover716/Trombone-Shorty-Orleans-Avenue.webp.webp",
    about: "Special guests: Jackie Venson & Farrow",
    email: "",
    phone: "(716) 754-4375",
    goingCount: 0
  },
  {
    name: "Joe Pera (Late Show)",
    date: "2024-06-01",
    startTime: "21:30",
    endTime: "00:00",
    address: "681 Main Street, Buffalo 14203",
    website: "https://townballroom.com/",
    thumbnail: "http://res.cloudinary.com/dxjfmwr5n/image/upload/v1716403527/discover716/Joe-Pera.webp.webp",
    about: "Live Music",
    email: "",
    phone: "716.852.3900",
    goingCount: 0
  }
]

// populate the db
beforeEach(async () => {

  await models.Event.deleteMany({});
  let eventObject = new models.Event(data[0]);
  await eventObject.save();
  eventObject = new models.Event(data[1]);
  await eventObject.save();
})


describe("testing fetching the data", () => {

  test('events are returned as json', async () => {
    await api
      .get('/api/events/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})


describe("testing the size of the data", () => {

  test('there are two events', async () => {

    const response = await api.get('/api/events/all')
                                  .expect(200)
                                    .expect('Content-Type', /application\/json/);
  
    assert.strictEqual(response.body.length, 2);
  })

})


describe("testing the fetching data by conditions", () => { 

  test('events by conditions are returned as json', async () => {
    await api
      .get('/api/events/info/1/name/asc')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})


describe("deleting the data from the database", () => {

  test("events are deleted", async () => {

    await api
      .delete('/api/events/all')
      .expect(200);

  })

})


after(async () => {
  await mongoose.connection.close()
})