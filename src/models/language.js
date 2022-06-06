'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Language extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        
        // % M:1 (belongsTo) [languages].[created_by] -> [users].[user_id]
        // % Many languages data can be added by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'language_created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [languages].[updated_by] -> [users].[user_id]
        // % Many languages data can be updated by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'language_updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (belongsTo) [languages].[language_id] -> [books].[language_id]
        // % One language is assigned to one book.
        this.belongsTo(models.Book, {
            foreignKey: 'language_id',
            as: 'book_language',
            onDelete: 'RESTRICT',
        });
        }
    }
    Language.init(
        {
            language_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Language table.'
            },

            language_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[languages].[language_name] cannot be null!' },
                    notEmpty: { msg: '[languages].[language_name] cannot be blank or empty!' }
                },
                comment: 'Publisher name. Example values are: Penguin Books...'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[languages].[created_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the language.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[languages].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the language.'

            },
        }, 
        {
            sequelize,
            modelName: 'Language',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Language;
};