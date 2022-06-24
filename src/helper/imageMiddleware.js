const multer = require('multer');
const { barangayCardStorage, profilePicStorage, bookImageStorage } = require('./imageStorage');
const fileFilterHelper = require('./imageHelper');

const profilePicUpload = (req, res, next) => {
    let upload = multer({
        storage: profilePicStorage,
        fileFilter: fileFilterHelper.imageFilter,
    }).single("profile_pic");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [req.fileValidationError],
        });
    } else if (!req.file) {
        return res.status(500).send({
            error: true,
            data: [],
            message: ["Please select an image to upload"],
        });
    } else if (err instanceof multer.MulterError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    } else if (err) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    }
    next();
    });
};
exports.profilePicUpload = profilePicUpload;

const barangayCardUpload = (req, res, next) => {
    let upload = multer({
        storage: barangayCardStorage,
        fileFilter: fileFilterHelper.imageFilter,
    }).single("profile_pic");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [req.fileValidationError],
        });
    } else if (!req.file) {
        return res.status(500).send({
            error: true,
            data: [],
            message: ["Please select an image to upload"],
        });
    } else if (err instanceof multer.MulterError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    } else if (err) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    }
    next();
    });
};
exports.barangayCardUpload = barangayCardUpload;

const bookImageUpload = (req, res, next) => {
    let upload = multer({
        storage: bookImageStorage,
        fileFilter: fileFilterHelper.imageFilter,
    }).single("profile_pic");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [req.fileValidationError],
        });
    } else if (!req.file) {
        return res.status(500).send({
            error: true,
            data: [],
            message: ["Please select an image to upload"],
        });
    } else if (err instanceof multer.MulterError) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    } else if (err) {
        return res.status(500).send({
            error: true,
            data: [],
            message: [err],
        });
    }
    next();
    });
};
exports.bookImageUpload = bookImageUpload;