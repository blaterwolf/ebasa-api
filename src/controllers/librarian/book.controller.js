/**
 * ========================================================================
 * * BOOK CONTROLLER
 * ------------------------------------------------------------------------
 * This controller is for author data in the book. The librarian
 * can be able to create, update, and retrieve all data.
 * ========================================================================
 * 
 */

const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helper/controller.helper');

var includeValue = [
    {
        model: db.User,
        attributes: ['user_id', 'full_name'],
        as: 'book_created_by_admin',
    },
    {
        model: db.User,
        attributes: ['user_id', 'full_name'],
        as: 'book_updated_by_admin',
    },
    {
        model: db.Genre,
        attributes: ['genre_id', 'genre_name'],
        as: 'genre_assigned_to_book',
    },
    {
        model: db.Publisher,
        attributes: ['publisher_id', 'publisher_name'],
        as: 'publisher_assigned_to_book',
    },
    {
        model: db.Shelf,
        attributes: ['shelf_id', 'shelf_name'],
        as: 'shelf_assigned_to_book',
    },
    {
        model: db.Language,
        attributes: ['language_id', 'language_name'],
        as: 'language_assigned_to_book',
    },
    {
        // Life Saver: https://dev.to/michaelpaulkunz/sequelize-s-super-many-to-many-associations-1opf
        model: db.BookAuthor,
        as: 'authors_assigned_to_book',
        include: [
            {
                model: db.Author,
                attributes: ['author_id', 'author_name'],
                as: 'author_assigned_to_book',
            }
        ]
    }
];

// % Get all books
// % ROUTE: /ebasa/v1/librarian/book
exports.getAllBooks = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Book
        .findAll({
            include: includeValue
        })
        .then(data => dataResponse(res, data, 'Book records retrieved.', 'No Book records retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Get one book
// % ROUTE: /ebasa/v1/librarian/book/:book_id
exports.getOneBook = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    db.Book
        .findOne({ 
            where: { book_id: req.params.book_id },
            include: includeValue
        })
        .then(data => dataResponse(res, data, 'Book record retrieved.', 'No Book record retrieved.'))
        .catch(err => errResponse(res, err))
}

// % Create a book
// % ROUTE: /ebasa/v1/librarian/book
exports.createBook = (req, res, next) => {
    // Check authorization first
    let v = checkAuthorization(req, res, 'Librarian');
    if (v != null) return v;

    // convert numbers
    req.body.page_number = parseInt(req.body.page_number);
    req.body.total_available = parseInt(req.body.total_available);
    req.body.current_available = parseInt(req.body.current_available);

    req.body.book_image = req.file != undefined ? req.file.filename : '';
    req.body.created_by = req.user.user_id;
    var authors = Array.isArray(req.body.author) ? req.body.author : [req.body.author];
    delete req.body.author;

    db.Book
        .create(req.body)
        .then((resultBook) => {
            db.BookAuthor
                .bulkCreate(authors.map(author => {
                    return {
                        book_id: resultBook.book_id,
                        author_id: author,
                    }
                }))
                .then((result) => {
                    db.Book 
                        .findOne({
                            where: { book_id: resultBook.book_id }
                        })
                        .then((data) => dataResponse(res, data, 'Book record created.', 'No Book record created.'))
                        .catch((err) => errResponse(res, err))
                })
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err))
}

// % Update book details
// % ROUTE: /ebasa/v1/librarian/book/update-book-details/:book_id
exports.updateBookDetails = (req, res, next) => {
}

// % Change the book's image
// % ROUTE: /ebasa/v1/librarian/book/update-book-image/:book_id
exports.updateBookImage = (req, res, next) => {
}

// % Update book status
// % ROUTE: /ebasa/v1/librarian/book/status/:book_id
exports.updateBookStatus = (req, res, next) => {
}

