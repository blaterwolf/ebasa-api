var router = require('express').Router();

/**
 * =====================================================================
 * * LIBRARIAN ROUTES
 * =====================================================================
 */

// >> MIDDLEWARE
const { profilePicUpload } = require('../helper/imageMiddleware');

// % =====================================================================
// % Library Management Routes
// % =====================================================================
// % Author
var authorController = require('../controllers/librarian/author.controller');
router.post('/author', authorController.createAuthor);
router.get('/author', authorController.getAllAuthor);
router.get('/author/:author_id', authorController.getOneAuthor);
router.put('/author/:author_id', authorController.updateAuthor);

// % Language
var languageController = require('../controllers/librarian/language.controller');
router.post('/language', languageController.createLanguage);
router.get('/language', languageController.getAllLanguage);
router.get('/language/:language_id', languageController.getOneLanguage);
router.put('/language/:language_id', languageController.updateLanguage);

// % Genre
var genreController = require('../controllers/librarian/genre.controller');
router.post('/genre', genreController.createGenre);
router.get('/genre', genreController.getAllGenre);
router.get('/genre/:genre_id', genreController.getOneGenre);
router.put('/genre/:genre_id', genreController.updateGenre);

// % Publisher
var publisherController = require('../controllers/librarian/publisher.controller');
router.post('/publisher', publisherController.createPublisher);
router.get('/publisher', publisherController.getAllPublisher);
router.get('/publisher/:publisher_id', publisherController.getOnePublisher);
router.put('/publisher/:publisher_id', publisherController.updatePublisher);

// % Shelves
var shelfController = require('../controllers/librarian/shelf.controller');
router.post('/shelf', shelfController.createShelf);
router.get('/shelf', shelfController.getAllShelf);
router.get('/shelf/:shelf_id', shelfController.getOneShelf);
router.put('/shelf/:shelf_id', shelfController.updateShelf);

// % =====================================================================
// % Visiting Log Controller
// % =====================================================================
var visitLogController = require('../controllers/librarian/visitlog.controller');
router.post('/visitlog', visitLogController.createVisitLog);
router.get('/visitlog', visitLogController.getAllVisitLog);
router.get('/visitlog/:visit_id', visitLogController.getOneVisitLog);

// % =====================================================================
// % Librarian Info Controller
// % =====================================================================
var infoController = require('../controllers/librarian/info.controller');
router.get('/info'                  , infoController.getInfo);
router.put('/info'                  , infoController.updateInfo);
router.put('/info/change-password'  , infoController.changePassword);
router.put('/info/change-profile-pic' , profilePicUpload, infoController.changeProfilePic);

// % =====================================================================
// % User Management Controller
// % =====================================================================
var userController = require('../controllers/librarian/users.controller');
router.get('/users-count'                 , userController.getUsersCount);
router.get('/users/residents'             , userController.getAllResidents);
router.get('/users/residents/:user_id'    , userController.getOneResident);
router.get('/users/librarians'            , userController.getAllLibrarians);
router.get('/users/librarians/:user_id'   , userController.getOneLibrarian);

// * Export Module to use in ../index.js
module.exports = router;