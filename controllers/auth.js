

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const authRouter = require('express').Router();
const User = require('../mongoDB/models').User;
const logger = require('../utils/logger');


authRouter.post('/login', async (req, res) => {

    // obtain userName & password
    const {userName, password} = req.body;

    // fetch user from db using userName
    const user = await User.findOne({userName});

    // check password
    const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : null;

    // if user or passwordCorrect fails return error
    if (!(user && passwordCorrect)) {

        // log
        logger.info('Invalid username or password');

        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    // create a userToken using userName and user._id
    const userToken = {
        userName: user.userName,
        id: user._id
    }

    // create a jwt using userToken and secret
    const token = jwt.sign(userToken, "ashawng");


    // response with 200
    res
        .status(200)
        .send({ token, username: user.userName})

})


module.exports = {
    authRouter
}