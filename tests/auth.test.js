

const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const models = require('../mongoDB/models');
const supertest = require('supertest');
const app = require('../app');
const auth_test_helper = require('./auth_test_helper');
const bcrypt = require('bcrypt');

const User = require('../mongoDB/models').User;


const api = supertest(app);

beforeEach(async () => {
    // delete everything
    await User.deleteMany({});

    // init users
    let users = await auth_test_helper.initUsers();
    users = users.map( user =>  new User(user) );

    const promiseArray = users.map(user => user.save());
    await Promise.all(promiseArray);
})


test.only('user authentication process check.', async () => {

    const user = {
        userName: 'Sanji',
        password: "456"
    }

    await api
        .post('/auth/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);

})