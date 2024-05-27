
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('events are returned as json', async () => {
  await api
    .get('/api/events/all')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('events by conditions are returned as json', async () => {
    await api
      .get('/api/events/info/1/name/asc')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

after(async () => {
  await mongoose.connection.close()
})