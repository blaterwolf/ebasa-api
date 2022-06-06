var router = require('express').Router();

/**
 * >> TEST CONTROLLER (../src/controllers/test.controller)
 * ? This will be used to populate initial data from the EBASA API through the database.
*/

var testController = require('../controllers/test.controller');
router.get('/', testController.test);
router.get('/populate_admin', testController.populate_admin);
router.get('/populate_librarians', testController.populate_librarians);
router.get('/populate_residents', testController.populate_residents);
router.get('/user_table', testController.user_table);
router.post('/one_user', testController.one_user);

// * Export Module to use in ../index.js
module.exports = router;