/**
 * ? USER CONTROLLER
 * 
 * ? This controller is for user management related queries.
 */

const db     = require('../../models');
const { checkAuthorization, dataResponse, errResponse } = require('../../helper/controller.helper');

// % Gets the number of users in the database.
// % ROUTE: /ebasa/v1/librarian/users-count
exports.getUsersCount = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    // Count user_type values
    db.User
        .count({
            col: 'user_type',
            group: ['user_type']
        })
        .then((result) => {
            userCount = {
                all: 0,
                admin: 0,
                librarian: 0,
                resident: 0
            };

            result.forEach(element => {
                var count = element.count;
                userCount.all += count;

                // Get count per user
                if(element.user_type === 'Admin')        userCount.admin      = count;
                if(element.user_type === 'Librarian')    userCount.librarian  = count;
                if(element.user_type === 'Resident')     userCount.resident   = count;
            })

            // Delete Admin since this is not the scope of librarian.
            delete userCount.admin;

            // Send userCount object
            res.send({ user_count: userCount });
        })
        .catch(err => errResponse(res, err));
}

const findOption = (params, userType) => {
    if (params === null){
        return {
            where: {
                user_type: userType
            },
            attributes: ['user_id', 'user_type', 'full_name', 'email_address', 'contact_number']
        }
    }
    return {
        where: {
            user_id: params,
            user_type: userType,
        },
        attributes: ['user_id', 'user_type', 'full_name', 'email_address', 'contact_number']
    }
}

// % Get All Residents in the database.
// % ROUTE: /ebasa/v1/librarian/users/residents
exports.getAllResidents = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.User
        .findAll(findOption(null, 'Resident'))
        .then(data => dataResponse(res, data, 'Resident records retrieved.', 'No Resident record retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get One Resident in the database.
// % ROUTE: /ebasa/v1/librarian/users/residents/:user_id
// ? Bug: Kapag gumamit ng librarian_id pero resident_id to, nareretrive pa rin?
// ? Solution: Change the findByPk to findOne
exports.getOneResident = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.User
        .findOne(findOption(req.params.user_id, 'Resident'))
        .then(data => dataResponse(res, data, 'Resident record retrieved.', 'No such resident record is found.'))
        .catch(err => errResponse(res, err))
}

// % Get All Librarians in the database.
// % ROUTE: /ebasa/v1/librarian/users/librarians

exports.getAllLibrarians = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.User
        .findAll(findOption(null, 'Librarian'))
        .then(data => dataResponse(res, data, 'Librarian records retrieved.', 'No Librarian record retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get One Librarian in the database.
// % ROUTE: /ebasa/v1/librarian/users/librarians/:user_id
exports.getOneLibrarian = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.User
        .findOne(findOption(req.params.user_id, 'Librarian'))
        .then(data => dataResponse(res, data, 'Librarian record retrieved.', 'No such librarian record is found.'))
        .catch(err => errResponse(res, err))
}