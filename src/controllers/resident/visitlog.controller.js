/**
 * ========================================================================
 * * VISITING LOG CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for visiting log activity of resident. The resident
 * can be able to view their own visiting log.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

// % Create a new visit log
// % ROUTE: /ebasa/v1/librarian/visitlog
exports.createVisitLog = (req, res, next) => {
}

// % Get all visit logs
// % ROUTE: /ebasa/v1/resident/visitlog
exports.getAllVisitLog = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Resident');
    if (v != null) return v;

    db.Visit_Log
        .findAll()
        .then(data => dataResponse(res, data, 'Visit Log records retrieved.', 'No Visit Log records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one visit log
// % ROUTE: /ebasa/v1/resident/visitlog/:user_id
exports.getOneVisitLog = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Resident');
    if (v != null) return v;

    db.Visit_Log
    .findOne({
        where: {
            visit_id: req.params.visit_id,
        }
    })
    .then(data => dataResponse(res, data, 'Visit Log record retrieved.', 'No Visit Log record is found.'))
    .catch(err => errResponse(res, err))
}