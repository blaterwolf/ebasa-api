/**
 * ========================================================================
 * * GENRE CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for genre data in the library. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

const genreFindOption = (params) => {
    return {
        where: {
            genre_id: params
        },
        attributes: ['genre_id', 'genre_name', 'created_by', 'updated_by']
    }
}

// % Create a new genre
// % ROUTE: /ebasa/v1/librarian/genre
exports.createGenre = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;

    db.Genre
        .create(req.body)
        .then((result) => {
            db.Genre
                .findOne(genreFindOption(result.genre_id))
                .then(data => dataResponse(res, data, 'Genre record created.', 'No Genre record is found.'))
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Get all genres
// % ROUTE: /ebasa/v1/librarian/genre
exports.getAllGenre = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Genre
        .findAll({
            attributes: ['genre_id', 'genre_name']
        })
        .then(data => dataResponse(res, data, 'Genre records retrieved.', 'No Genre records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one genre
// % ROUTE: /ebasa/v1/librarian/genre/:genre_id
exports.getOneGenre = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Genre
        .findOne(genreFindOption(req.params.genre_id))
        .then(data => dataResponse(res, data, 'Genre record retrieved.', 'No Genre record is found.'))
        .catch(err => errResponse(res, err))
}

// % Update a genre
// % ROUTE: /ebasa/v1/librarian/genre/:genre_id
exports.updateGenre = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.updated_by = req.user.user_id;

    db.Genre
        .update(req.body, genreFindOption(req.params.genre_id))
        .then(data => dataResponse(res, data, 'Genre record updated.', 'No Genre record is found.'))
        .catch(err => errResponse(res, err))
}