var router = require('express').Router();

/**
 * =====================================================================
 * * RESIDENT ROUTES
 * =====================================================================
 */

// % Transaction: Borrow Controller
// ! Not yet implemented
// >> var borrowController = require('../controllers/resident/borrow.controller');

// % Visit Log Controller
// ! Not yet implemented
var visitLogController = require('../controllers/resident/visitlog.controller');
// >> router.post("/add-visit-log"              , visitLogController.createVisitLog);
// >> router.get ("/visit-logs"                 , visitLogController.getAllVisitLogs);
// >> router.get ("/visit-logs/:user_id"        , visitLogController.getOneVisitLog);

// % Resident Info Controller
// ! Not yet implemented
var infoController = require('../controllers/resident/info.controller');
// >> router.get('/info'                  , infoController.getInfo);
// >> router.put('/info'                  , infoController.updateInfo);
// >> router.put('/info/change-password'  , infoController.changePassword);

// * Export Module to use in ../index.js
module.exports = router;