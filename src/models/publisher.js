'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Publisher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % M:1 (belongsTo) [publishers].[created_by] -> [users].[user_id]
        // % Many publisher data can be added by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'publisher_created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [publishers].[updated_by] -> [users].[user_id]
        // % Many publisher data can be updated by a single admin/librarian
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'publisher_updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (belongsTo) [publishers].[publisher_id] -> [books].[publisher_id]
        // % One publisher is assigned to one book.
        this.belongsTo(models.Book, {
            foreignKey: 'publisher_id',
            as: 'book_publisher',
            onDelete: 'RESTRICT',
        });

        

        }
    }
    Publisher.init(
        {
            publisher_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Publisher table.'
            },

            publisher_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[publishers].[publisher_name] cannot be null!' },
                    notEmpty: { msg: '[publishers].[publisher_name] cannot be blank or empty!' }
                },
                comment: 'Publisher name. Example values are: Penguin Books...'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[user].[updated_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the publisher.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[user].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the publisher.'
            },
        }, 
        {
            sequelize,
            modelName: 'Publisher',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Publisher;
};