/**
 * ? INFO CONTROLLER
 * 
 * ? This controller is for querying admin related information
 */


// Import required packages
const db     = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');
const bcrypt = require('bcrypt');

// % Gets the information of the currently logged in user.
// % ROUTE: /ebasa/v1/admin/info
exports.getInfo = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    checkAuthorization(req, res, 'Admin');

    db.User.findOne({
        where: {
            user_id: req.user.user_id,
        },
        attributes: ['user_id', 'first_name', 'last_name', 'email_address', 'contact_number', 'user_type', 'status'],
    })
        .then((data) => dataResponse(res, data, 'A Record has been identified', 'No Record has been identified'))
        .catch((err) => errResponse(res, err));
}

// % Updates the information of the currently logged in user.
// % ROUTE: /ebasa/v1/admin/info
exports.updateInfo = (req, res, next) => {
    req.body['updated_by'] = req.user.user_id;
    // Check if user logged in or logged in but not Admin
    checkAuthorization(req, res, 'Admin');


    db.User
        .findByPk(req.user.user_id)
        .then((result) => {
            // If no result return empty response
            if(result == null) emptyDataResponse(res, 'No Record has been identified');
        
            // Update Information from request body
            db.User
                .update(req.body, {
                    where: {
                        user_id: req.user.user_id,
                    }
                })
                .then(() => {
                    // Get Super Admin info
                    db.User
                        .findByPk(req.user.user_id, {attributes: ['user_id', 'first_name', 'last_name', 'email_address', 'contact_number', 'user_type', 'status', 'updated_by']})
                        .then((data) => dataResponse(res, data, 'A Record has been successfully updated', 'No changes in the record'))
                        .catch((err) => errResponse(res, err));
                })
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
}

// % Change the password of the currently logged in user.
// % ROUTE: /ebasa/v1/admin/info/change-password
exports.changePassword = (req, res, next) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Admin');

    // Get password from req.body
    const new_password = bcrypt.hashSync(req.body.new_password, 10) ;
    console.log({
        "user_id": req.user.user_id,
        "password": req.body.new_password,
        "hashed": new_password,
    })
    // Find user and check password
    db.User
        .findByPk(req.user.user_id, { attributes: ['user_id', 'password'] })
        .then(result => {
            if(result) {
                bcrypt.compare(req.body.current_password, result.password, (err, hasResult) => {
                    // Display error if exists
                    if(err) console.log(err);
                    
                    // If no result then send empty reponse
                    if(!hasResult) return emptyDataResponse(res, 'Invalid details or password');
                    
                    // Else update user password
                    db.User
                        .update({ password: new_password }, { where: { user_id: req.user.user_id }})
                        .then(data => dataResponse(res, data, 'Password has been changed successfully', 'Password has been changed successfully'))
                        .catch(err => errResponse(res, err));
                });
            }
        })
        .catch(err => errResponse(res, err));
}