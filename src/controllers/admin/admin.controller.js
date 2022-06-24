/**
 * ? ADMIN POWERS CONTROLLER
 * 
 * ? This controller is for queries related to what an admin can do.
 */

const db     = require('../../models');
const { checkAuthorization, dataResponse, errResponse } = require('../../helper/controller.helper');

// % Gets all the users in the database.
// % ROUTE: /ebasa/v1/admin/users
exports.getAllUsers = (req, res, next) => {
    // Check authorization first
    checkAuthorization(req, res, 'Admin');

    // Get all users
    db.User
        .findAll({
            attributes: ['user_id', 'user_type', 'full_name', 'email_address', 'contact_number']
        })
        .then((data) => dataResponse(res, data, 'Users retrieved successfully', 'No user has been identified'))
        .catch((err) => errResponse(res, err));
}

// % Registers a new admin.
// % ROUTE: /ebasa/v1/admin/add-account-admin

exports.registerAdmin = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Admin');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;
    req.body.verified_by = req.user.user_id;
    req.body.full_name = '';

    db.User
        .create(req.body)
        .then((result) => {
            db.User
                .findOne({
                    where: {
                        user_id: result.user_id
                    },
                })
                .then((data) => dataResponse(res, data, 'Admin is successfully registered in the database.', 'No such admin has been identified.'))
                .catch((err) => errResponse(res, err));
        })
        .catch(err => helper.errResponse(res, err));
}

// % Registers a new librarian.
// % ROUTE: /ebasa/v1/admin/add-account-librarian
exports.registerLibrarian = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Admin');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;
    req.body.verified_by = req.user.user_id;
    req.body.full_name = '';

    db.User
        .create(req.body)
        .then((result) => {
            db.User
                .findOne({
                    where: {
                        user_id: result.user_id
                    },
                })
                .then((data) => dataResponse(res, data, 'Librarian is successfully registered in the database.', 'No such librarian has been identified.'))
                .catch((err) => errResponse(res, err));
        })
        .catch(err => helper.errResponse(res, err));
}