'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % M:1 (belongsTo) [authors].[created_by] -> [users].[user_id]
        // % Many authors data can be added by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'author_created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [authors].[updated_by] -> [users].[user_id]
        // % Many authors data can be updated by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'author_updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:M (belongsToMany) [authors]:[books] through [bookauthors]
        // % Many authors can be assigned to many books.
        this.belongsToMany(models.Book, {
            through: 'bookauthors',
            as: 'books',
            foreignKey: 'author_id',
            otherKey: 'book_id',
            onDelete: 'RESTRICT',
        });
        }
    }
    Author.init(
        {
            author_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Author table.'
            },
            
            author_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[authors].[author_name] cannot be null!' },
                    notEmpty: { msg: '[authors].[author_name] cannot be blank or empty!' }
                },
                comment: 'Author name. Example values are: John Green...'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[authors].[created_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the publisher.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[authors].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the publisher.'
            },
        }, 
        {
            sequelize,
            modelName: 'Author',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Author;
};