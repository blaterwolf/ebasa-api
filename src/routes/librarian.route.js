var router = require('express').Router();

/**
 * =====================================================================
 * * LIBRARIAN ROUTES
 * =====================================================================
 */

// % Librarian Info Controller
// ! Not yet implemented
var infoController = require('../controllers/librarian/info.controller');
// >> router.get('/info'                  , infoController.getInfo);
// >> router.put('/info'                  , infoController.updateInfo);
// >> router.put('/info/change-password'  , infoController.changePassword);

// * Export Module to use in ../index.js
module.exports = router;