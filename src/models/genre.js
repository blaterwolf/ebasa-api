'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % M:1 (belongsTo) [genres].[created_by] -> [users].[user_id]
        // % Many genres data can be added by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'genre_created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [genres].[updated_by] -> [users].[user_id]
        // % Many genres data can be updated by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'genre_updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (belongsTo) [genres].[genre_id] -> [books].[genre_id]
        // % One genre is assigned to one book.
        this.belongsTo(models.Book, {
            foreignKey: 'genre_id',
            as: 'book_genre',
            onDelete: 'RESTRICT',
        });
        }
    }
    Genre.init(
        {
            genre_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Genre table.'
            },

            genre_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[genres].[genre_name] cannot be null!' },
                    notEmpty: { msg: '[genres].[genre_name] cannot be blank or empty!' }
                },
                comment: 'Genre name. Example values are: Fiction...'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[genres].[created_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the genre.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[genres].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the genre.'
            },
        }, 
        {
            sequelize,
            modelName: 'Genre',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Genre;
};