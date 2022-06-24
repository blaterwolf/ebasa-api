/**
 * ========================================================================
 * * SHELF CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for shelf data in the library. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

const shelfFindOption = (params) => {
    return {
        where: {
            shelf_id: params
        },
        attributes: ['shelf_id', 'shelf_name', 'created_by', 'updated_by']
    }
}

// % Create a new shelf
// % ROUTE: /ebasa/v1/librarian/shelf
exports.createShelf = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;

    db.Shelf
        .create(req.body)
        .then((result) => {
            db.Shelf
                .findOne(shelfFindOption(result.shelf_id))
                .then(data => dataResponse(res, data, 'Shelf record created.', 'No Shelf record is found.'))
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Get all shelves
// % ROUTE: /ebasa/v1/librarian/shelf
exports.getAllShelf = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Shelf
        .findAll({
            attributes: ['shelf_id', 'shelf_name']
        })
        .then(data => dataResponse(res, data, 'Shelf records retrieved.', 'No Shelf records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one shelf
// % ROUTE: /ebasa/v1/librarian/shelf/:shelf_id
exports.getOneShelf = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Shelf
        .findOne(shelfFindOption(req.params.shelf_id))
        .then(data => dataResponse(res, data, 'Shelf record retrieved.', 'No Shelf record is found.'))
        .catch(err => errResponse(res, err))
}

// % Update a shelf
// % ROUTE: /ebasa/v1/librarian/shelf/:shelf_id
exports.updateShelf = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.updated_by = req.user.user_id;

    db.Shelf
        .update(req.body, shelfFindOption(req.params.shelf_id))
        .then(data => dataResponse(res, data, 'Shelf record updated.', 'No Shelf record is found.'))
        .catch(err => errResponse(res, err))
}