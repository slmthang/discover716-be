

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = require('express').Router();
const User = require('../mongoDB/models').User;
const logger = require('../utils/logger');
const config = require('../utils/config');

authRouter.post('/login', async (req, res) => {

    // obtain userName & password
    const {username, password} = req.body;

    console.log(username);

    // fetch user from db using userName
    const user = await User.findOne({username});

    
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
        username: user.username,
        id: user._id
    }

    // create a jwt using userToken and secret
    const token = jwt.sign(userToken, config.JWT_SECRET);


    // response with 200
    res
        .status(200)
        .send({ token, loggedIn: "true"})

})


module.exports = {
    authRouter
}