'use strict';
const { Model, TEXT } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % 1:1 (hasOne) [books].[shelf_id] -> [shelves].[shelf_id]
        // % One book has one shelf aassigned.
        this.hasOne(models.Shelf, {
            foreignKey: 'shelf_id',
            as: 'shelf_assigned_to_book',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (hasOne) [books].[genre_id] -> [genres].[genre_id]
        // % One book has one genre assigned.
        this.hasOne(models.Genre, {
            foreignKey: 'genre_id',
            as: 'genre_assigned_to_book',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (hasOne) [books].[publisher_id] -> [publishers].[publisher_id]
        // % One book has one publisher assigned.
        this.hasOne(models.Publisher, {
            foreignKey: 'publisher_id',
            as: 'publisher_assigned_to_book',
            onDelete: 'RESTRICT',
        });
        
        // % 1:1 (hasOne) [books].[language_id] -> [languages].[language_id]
        // % One book has one language assigned.
        this.hasOne(models.Language, {
            foreignKey: 'language_id',
            as: 'language_assigned_to_book',
            onDelete: 'RESTRICT',
        });

        // >> BookAuthor Table

        // % M:M (belongsToMany) [books]:[authors] through [bookauthors]
        // % Many books can have many authors.
        this.belongsToMany(models.Author, {
            through: 'bookauthors',
            as: 'authors_assigned_to_book',
            foreignKey: 'book_id',
            otherKey: 'author_id',
            onDelete: 'RESTRICT',
        });

        // >> Transaction Table

        // % 1:1 (hasOne) [books].[transaction_id] -> [transactions].[transaction_id]
        // % One book has one transaction assigned.
        this.hasOne(models.Transaction, {
            foreignKey: 'transaction_id',
            as: 'transaction_assigned_to_book',
            onDelete: 'RESTRICT',
        });
        }
    }
    Book.init(
        {
            book_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Book table.'
            },

            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[isbn] cannot be null!' },
                    notEmpty: { msg: '[books].[isbn] cannot be blank or empty!' }
                },
                comment: 'ISBN number. Example values are: 978-0-321-87758-1...'
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[title] cannot be null!' },
                    notEmpty: { msg: '[books].[title] cannot be blank or empty!' }
                },
                comment: 'Book title. Example values are: The Hobbit...'
            },

            format: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[format] cannot be null!' },
                    isIn: {
                        args: [[ 'Paperback', 'Hardcover' ]],
                        msg: '[books].[format] must be either `Paperback` or `Hardcover`!'
                    }
                },
                comment: 'Book format. Example values are: Paperback, Hardcover...'
            },

            page_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[page_number] cannot be null!' },
                    notEmpty: { msg: '[books].[page_number] cannot be blank or empty!' },
                    isInt: { msg: '[books].[page_number] must be an integer!' }
                },
                comment: 'Number of pages in the book. Example values are: 200, 300...'
            },

            published_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[published_date] cannot be null!' },
                    notEmpty: { msg: '[books].[published_date] cannot be blank or empty!' },
                    isDate: { msg: '[books].[published_date] must be a valid date!' }
                },
                comment: 'Date the book was published. Example values are: 2020-01-01...'
            },
            
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[description] cannot be null!' },
                    notEmpty: { msg: '[books].[description] cannot be blank or empty!' }
                },
                comment: 'Book description. Example values are: A short description of the book...'
            },

            condition: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[condition] cannot be null!' },
                    isIn: {
                        args: [[ 'New', 'Good', 'Fair', 'Poor' ]],
                        msg: '[books].[condition] must be either `New`, `Good`, `Fair` or `Poor`!'
                    },
                },
                comment: 'Book condition. Example values are: New, Good, Fair, Poor...'
            },

            total_available: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[total_available] cannot be null!' },
                    notEmpty: { msg: '[books].[total_available] cannot be blank or empty!' },
                    isInt: { msg: '[books].[total_available] must be an integer!' }
                },
                comment: 'Total number of books available. Example values are: 10, 20...'
            },
            
            current_available: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[current_available] cannot be null!' },
                    notEmpty: { msg: '[books].[current_available] cannot be blank or empty!' },
                    isInt: { msg: '[books].[current_available] must be an integer!' }
                },
                comment: 'Current number of books available. Example values are: 5, 10...'
            },

            book_image: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'This contains the book_image of the user.'
            },

            // >> WITH FOREIGN KEYS

            genre_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[genre_id] must be a valid UUID!' }
                },
                comment: 'genre_id that references the genre_id value in Genre table.'
            },

            publisher_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[publisher_id] must be a valid UUID!' }
                },
                comment: 'publisher_id that references the publisher_id value in Publisher table.'
            },
            
            language_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[language_id] must be a valid UUID!' }
                },
                comment: 'language_id that references the language_id value in Language table.'
            },

            shelf_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[shelf_id] must be a valid UUID!' }
                },
                comment: 'shelf_id that references the shelf_id value in Shelf table.'
            }, 

            created_by:{
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[created_by] must be a valid UUID!' }
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who created the book.'
            },

            updated_by:{
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[books].[updated_by] must be a valid UUID!' }
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the book.'
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[books].[status] cannot be null!' },
                    isIn: {
                        args: [[ 'Active', 'Inactive' ]],
                        msg: '[books].[status] must be either `Active` or `Inactive`!'
                    },
                },
                comment: 'Book status. Example values are: Active, Inactive...'
            }
        }, 
        {
            sequelize,
            modelName: 'Book',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Book;
};