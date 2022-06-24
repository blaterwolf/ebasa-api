/**
 * ========================================================================
 * * AUTHOR CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for author data in the library. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

const authorFindOption = (params) => {
    return {
        where: {
            author_id: params
        },
        attributes: ['author_id', 'author_name', 'created_by', 'updated_by']
    }
}

// % Create a new author
// % ROUTE: /ebasa/v1/librarian/author
exports.createAuthor = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;

    db.Author
        .create(req.body)
        .then((result) => {
            db.Author
                .findOne(authorFindOption(result.author_id))
                .then(data => dataResponse(res, data, 'Author record created.', 'No Author record is found.'))
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Get all authors
// % ROUTE: /ebasa/v1/librarian/author
exports.getAllAuthor = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Author
        .findAll({
            attributes: ['author_id', 'author_name']
        })
        .then(data => dataResponse(res, data, 'Author records retrieved.', 'No Author records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one author
// % ROUTE: /ebasa/v1/librarian/author/:author_id
exports.getOneAuthor = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Author
        .findOne(authorFindOption(req.params.author_id))
        .then(data => dataResponse(res, data, 'Author record retrieved.', 'No Author record is found.'))
        .catch(err => errResponse(res, err))
}

// % Update an author
// % ROUTE: /ebasa/v1/librarian/author/:author_id
exports.updateAuthor = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.updated_by = req.user.user_id;

    db.Author
        .update(req.body, authorFindOption(req.params.author_id))
        .then(data => dataResponse(res, data, 'Author record updated.', 'No Author record is found.'))
        .catch(err => errResponse(res, err))
}