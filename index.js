/**
* ================================================================
* * EBASA API - INDEX.JS CONFIGURATIONS
* ================================================================
*/

// % Import Important Modules
const express = require('express');
const dotenv = require('dotenv');
const {successMessage, failedMessage, syncSuccessMessage, syncFailedMessage } = require('./db_message');
const jwt    = require('jsonwebtoken');

// % Reference Models
const db = require('./src/models');

// % Initialize Express
var app = express();

// % Express Shenanigans
// ? parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// ? parse requrests of content-type application/json
app.use(express.json());

// % .env config
dotenv.config();

// % PORT value
const PORT = process.env.PORT || 3600;

// % Middleware
app.use(function (req, res, next) {
    // ? you can check session here.
    console.log(`Request has been sent to ${req.url}`);
    next();
});

/**
* ================================================================
* * AUTHENTICATION-RELATED
* ================================================================
*/

// >> Generate Secret Token (one time thing lang bestie, pang-generate lang)
// secret_token = require('crypto').randomBytes(64).toString("hex");
// console.log(secret_token);
// sanaol secret

// Authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1];
    // If token is null -> unauthorized response
    if (token == null) return res.status(401).send('No access token is detected.');
    // Verify the token, if not verified then forbidden
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        // If token is not verified -> send forbidden response
        if (err) {
            if(process.env.ENABLE_ACCESS_TOKEN_LOG === 'true') console.log(`${err}\n`);
            return res.sendStatus(403);
        }
        // Save token data to req.user
        req.user = user;
        if(process.env.ENABLE_ACCESS_TOKEN_LOG === 'true') console.log('Access Granted\n')
        next();
    });
}

/**
* ================================================================
* * ROUTES
* ================================================================
*/

// % Main API Route for EBASA API
const MAIN_API_ROUTE = '/ebasa/v1/';

// % Home Route
// >> localhost:3600/ebasa/v1/
app.use(`${ MAIN_API_ROUTE }`, require('./src/routes/home.route'));

// % Test Route
app.use(`${ MAIN_API_ROUTE }test`, require('./src/routes/test.route'));

// % With Authentication
// app.use(`${ MAIN_API_ROUTE }resident`, authenticateToken, require('./src/routes/resident.route'));
// app.use(`${ MAIN_API_ROUTE }librarian`, authenticateToken, require('./src/routes/librarian.route'));
// >> localhost:3600/ebasa/v1/admin
app.use(`${ MAIN_API_ROUTE }admin`, authenticateToken, require('./src/routes/admin.route'));


/**
* ================================================================
* * DATABASE
* ================================================================
*/

db.sequelize
    .authenticate()
    .then(() => {
        // * Log the success db connection message
        process.env.ENABLE_DB_LOG === "true" ? console.log(successMessage()) : {/* do nothing */};
    
        // * Sync models to the database 
        db.sequelize
            .sync({ alter: process.env.SEQUELIZE_ALTER_SYNC === 'true' || false })
            .then(() => app.listen(PORT, () => console.log(`${syncSuccessMessage(PORT, MAIN_API_ROUTE, process.env.SEQUELIZE_ALTER_SYNC)}`)))
            .catch((err) => console.log(syncFailedMessage(err)));
        })
    .catch(err => { console.error(failedMessage(err)); });
