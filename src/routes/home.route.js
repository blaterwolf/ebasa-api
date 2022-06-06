var router = require('express').Router();

/**
 * =====================================================================
 * * HOME ROUTES - WITHOUT AUTHORIZATION
 * =====================================================================
 */

// % Basically, pwede 'tong gamitin sa may front page. Probably the search stuffs sa book would be here.


/**
 * =====================================================================
 * * HOME ROUTES - WITH AUTHORIZATION
 * =====================================================================
 */

// % Mga routes na may kinalaman sa login and signup. 

// Login Controller
var loginController = require('../controllers/home/login.controller');
router.post('/login', loginController.login);

// Register Controller
// ! Not yet implemented
var registerController = require('../controllers/home/register.controller');

// * Export Module to use in ../index.js
module.exports = router;