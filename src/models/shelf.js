'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shelf extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % M:1 (belongsTo) [shelves].[created_by] -> [users].[user_id]
        // % Many shelf data can be added by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'shelf_created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [shelves].[updated_by] -> [users].[user_id]
        // % Many shelf data can be updated by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'shelf_updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (belongsTo) [shelves].[shelf_id] -> [books].[shelf_id]
        // % One shelf is assigned to one book.
        this.belongsTo(models.Book, {
            foreignKey: 'shelf_id',
            as: 'book_shelf',
            onDelete: 'RESTRICT',
        });
        }
    }
    Shelf.init(
        {
            shelf_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Shelf table.'
            },

            shelf_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[shelves].[shelf_name] cannot be null!' },
                    notEmpty: { msg: '[shelves].[shelf_name] cannot be blank or empty!' }
                },
                comment: 'Shelf name. Example values are: A1, A2, A3, etc...'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[users].[created_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the shelf.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the shelf.'

            },
        }, 
        {
            sequelize,
            modelName: 'Shelf',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Shelf;
};