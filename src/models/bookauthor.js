'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookAuthor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % 1:M (belongsTo) [bookauthors].[book_id] -> [books].[book_id]
        // % one book can have many authors.
        this.belongsTo(models.Book, {
            foreignKey: 'book_id',
            as: 'book_assigned_to_author',
            onDelete: 'RESTRICT',
        });

        // % 1:M (belongsTo) [bookauthors].[author_id] -> [authors].[author_id]
        // % one author can have many books.
        this.belongsTo(models.Author, {
            foreignKey: 'author_id',
            as: 'author_assigned_to_book',
            onDelete: 'RESTRICT',
        });
        
        }
    }
    BookAuthor.init(
    {
        book_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[book_authors].[book_id] value must be a UUIDV4 type' },
            },
            comment: 'Foreign key for the Book table.'
        },

        author_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[book_authors].[author_id] value must be a UUIDV4 type' },
            },
            comment: 'Foreign key for the Author table.'
        },
    }, 
    {
        sequelize,
        modelName: 'BookAuthor',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
    );
    return BookAuthor;
};