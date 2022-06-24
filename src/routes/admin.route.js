var router = require('express').Router();

/**
 * =====================================================================
 * * ADMIN ROUTES
 * =====================================================================
 */

// >> MIDDLEWARE
const { profilePicUpload } = require('../helper/imageMiddleware');

// % Admin Powers Management
var adminPowersController = require('../controllers/admin/admin.controller');
router.get('/users'                   , adminPowersController.getAllUsers);
router.post('/add-account-admin'      , adminPowersController.registerAdmin);
router.post('/add-account-librarian'  , adminPowersController.registerLibrarian);


// % Admin Info Controller
var infoController = require('../controllers/admin/info.controller');
router.get('/info'                  , infoController.getInfo);
router.put('/info'                  , infoController.updateInfo);
router.put('/info/change-password'  , infoController.changePassword);
router.put('/info/change-profile-pic' , profilePicUpload, infoController.changeProfilePic);

// % User Management Controller
var userController = require('../controllers/admin/users.controller');
router.get('/users-count'                 , userController.getUsersCount);
router.get('/users/residents'             , userController.getAllResidents);
router.get('/users/residents/:user_id'    , userController.getOneResident);
router.get('/users/librarians'            , userController.getAllLibrarians);
router.get('/users/librarians/:user_id'   , userController.getOneLibrarian);
router.get('/users/admins'                , userController.getAllAdmins);
router.get('/users/admins/:user_id'       , userController.getOneAdmin);

// * Export Module to use in ../index.js
module.exports = router;