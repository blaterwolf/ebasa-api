/**
 * =====================================================================
 * * REGISTER CONTROLLER
 * =====================================================================
 * This controller is for resident registration
 * =====================================================================
 */

// Import models
const db     = require("../../models");
const { dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');
const nodemailer = require('nodemailer');

// For One-Time Pin
var otp;
const generateOTP = () => {
    do { otp = parseInt(1 + (Math.random() * 1000000)) } while(otp > 1000000 && otp < 9999999);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'retta.schimmel49@ethereal.email',
        pass: '9Kj2DvXBxHKCwpmPFG'
    }
});

exports.checkAccount = (req, res) => {
    db.User
        .findAll({ where: { email_address: req.body.email_address }})
        .then(data => dataResponse(res, data=[], 'This account is already used', 'This account is available'))
        .catch(err => errResponse(res, err));
}