

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


describe('testing...', () => {

    beforeEach(async () => {
        // delete everything
        await User.deleteMany({});
    
        // init users
        let users = await auth_test_helper.initUsers();
        users = users.map( user =>  new User(user) );
    
        const promiseArray = users.map(user => user.save());
        await Promise.all(promiseArray);
    })

    describe('auth tests', () => {

        test('user authentication process check.', async () => {

            const user = {
                username: 'Luffy',
                password: "123"
            }
        
            await api
                .post('/auth/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        
        })

    })

    describe('api tests', () => {

        describe('fetching data', () => {

            describe('fetch all', () => {

                test('fetch all events', async () => {

                    await api
                        .get('/api/events/all')
                            .expect(200)
                            .expect('Content-Type', /application\/json/);
                })
    
                test('fetch all places', async () => {
    
                    await api
                        .get('/api/places/all')
                            .expect(200)
                            .expect('Content-Type', /application\/json/);
                })
    
                test('fetch all hotels', async () => {
    
                    await api
                        .get('/api/hotels/all')
                            .expect(200)
                            .expect('Content-Type', /application\/json/);
                })
    
                test('fetch all restaurants', async () => {
    
                    await api
                        .get('/api/restaurants/all')
                            .expect(200)
                            .expect('Content-Type', /application\/json/);
                })

            })

            describe('fetch by count', () => {
                
                test('fetch by count ( events )', async() => {

                    await api
                            .get('/api/events/count')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .expect( (response) => {
                                assert(response.body.hasOwnProperty('count'))
                            });

                })

                test('fetch by count ( places )', async() => {

                    await api
                            .get('/api/places/count')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .expect( (response) => {
                                assert(response.body.hasOwnProperty('count'))
                            });

                }) 

                test('fetch by count ( hotels )', async() => {

                    await api
                            .get('/api/hotels/count')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .expect( (response) => {
                                assert(response.body.hasOwnProperty('count'))
                            });

                }) 

                test('fetch by count ( restaurants )', async() => {

                    await api
                            .get('/api/restaurants/count')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .expect( (response) => {
                                assert(response.body.hasOwnProperty('count'))
                            });

                }) 

            })

        })
    })

})

