/**
 * =====================================================================
 * * LOGIN CONTROLLER
 * =====================================================================
 * Controller for Login
 * =====================================================================
 */


// Import required packages
const db     = require('../../models');
const { errResponse, emptyDataResponse } = require('../../helper/controller.helper');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

// env config
require('dotenv').config();

// Generate token
const generateToken = (data) => { 
    return jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: '30m' }); 
}

exports.login = (req, res) => {
    // Check if email and password field is empty
    if (String(req.body.email_address) === '' || String(req.body.password) === '') {
        return res.status(500).send({
            error   : true,
            message : "Email and Password cannot be empty",
        });
    }
    
    db.User
        .findOne({ 
            where: { email_address: req.body.email_address, status: 'Active' },
        })
        .then((data) => {
            // * If no data then send empty response
            if (data == null) return emptyDataResponse(res, 'That user does not exist');
            bcrypt.compare(req.body.password, data.password, (err, hasResult) => {
                // Display error if exists
                if(err) console.log(err);

                // If no result then send empty reponse
                if(!hasResult) return emptyDataResponse(res, 'Invalid details or password');

                // Else send reponse with data
                const user_id = data.user_id;
                const user_type = data.user_type;

                res.send({
                    error: false,
                    data: {
                        user_id: user_id,
                        user_type: user_type,
                        token: generateToken({ 
                            user_id   : user_id, 
                            user_type : user_type, 
                        }),
                    },
                    message: 'User Retrieved, Token Generated',
                });
            });
        })
        .catch((err) => errResponse(res, err));
}