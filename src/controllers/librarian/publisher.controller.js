/**
 * ========================================================================
 * * PUBLISHER CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for publisher data in the library. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

const publisherFindOption = (params) => {
    return {
        where: {
            publisher_id: params
        },
        attributes: ['publisher_id', 'publisher_name', 'created_by', 'updated_by']
    }
}

// % Create a new publisher
// % ROUTE: /ebasa/v1/librarian/publisher
exports.createPublisher = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;

    db.Publisher
        .create(req.body)
        .then((result) => {
            db.Publisher
                .findOne(publisherFindOption(result.publisher_id))
                .then(data => dataResponse(res, data, 'Publisher record created.', 'No Publisher record is found.'))
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Get all publishers
// % ROUTE: /ebasa/v1/librarian/publisher
exports.getAllPublisher = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Publisher
        .findAll({
            attributes: ['publisher_id', 'publisher_name']
        })
        .then(data => dataResponse(res, data, 'Publisher records retrieved.', 'No Publisher records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one publisher
// % ROUTE: /ebasa/v1/librarian/publisher/:publisher_id
exports.getOnePublisher = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Publisher
        .findOne(publisherFindOption(req.params.publisher_id))
        .then(data => dataResponse(res, data, 'Publisher record retrieved.', 'No Publisher record is found.'))
        .catch(err => errResponse(res, err))
}

// % Update a publisher
// % ROUTE: /ebasa/v1/librarian/publisher/:publisher_id
exports.updatePublisher = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.updated_by = req.user.user_id;

    db.Publisher
        .update(req.body, publisherFindOption(req.params.publisher_id))
        .then(data => dataResponse(res, data, 'Publisher record updated.', 'No Publisher record is found.'))
        .catch(err => errResponse(res, err))
}