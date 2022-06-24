/**
 * ========================================================================
 * * LANGUAGE CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for language data in the library. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

const languageFindOption = (params) => {
    return {
        where: {
            language_id: params
        },
        attributes: ['language_id', 'language_name', 'created_by', 'updated_by']
    }
}

// % Create a new language
// % ROUTE: /ebasa/v1/librarian/language
exports.createLanguage = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.created_by = req.user.user_id;

    db.Language
        .create(req.body)
        .then((result) => {
            db.Language
                .findOne(languageFindOption(result.language_id))
                .then(data => dataResponse(res, data, 'Language record created.', 'No Language record is found.'))
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Get all languages
// % ROUTE: /ebasa/v1/librarian/language
exports.getAllLanguage = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Language
        .findAll({
            attributes: ['language_id', 'language_name']
        })
        .then(data => dataResponse(res, data, 'Language records retrieved.', 'No Language records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one language
// % ROUTE: /ebasa/v1/librarian/language/:language_id
exports.getOneLanguage = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Language
        .findOne(languageFindOption(req.params.language_id))
        .then(data => dataResponse(res, data, 'Language record retrieved.', 'No Language record is found.'))
        .catch(err => errResponse(res, err))
}

// % Update a language
// % ROUTE: /ebasa/v1/librarian/language/:language_id
exports.updateLanguage = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    req.body.updated_by = req.user.user_id;

    db.Language
        .update(req.body, languageFindOption(req.params.language_id))
        .then(data => dataResponse(res, data, 'Language record updated.', 'No Language record is found.'))
        .catch(err => errResponse(res, err))
}