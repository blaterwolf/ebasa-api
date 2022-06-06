'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % 1:1 (belongsTo) [transactions].[book_id] -> [books].[book_id]
        // % One transaction has one book assigned.
        this.belongsTo(models.Book, {
            foreignKey: 'book_id',
            as: 'book_assigned_to_transaction',
            onDelete: 'RESTRICT',
        });

        // % 1:1 (belongsTo) [transactions].[user_id] -> [users].[user_id]
        // % One transaction has one user assigned.
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_assigned_to_transaction',
            onDelete: 'RESTRICT',
        });

        // % 1:M (belongsTo) [transactions].[returned_by] -> [users].[user_id]
        // % One transaction can be returned by many librarians.
        this.belongsTo(models.User, {
            foreignKey: 'returned_by',
            as: 'returned_by_user',
            onDelete: 'RESTRICT',
        });
        }
    }
    Transaction.init(
        {
            transaction_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the Transaction table.'
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[transactions].[user_id] value must be a UUIDV4 type' },
                },
                comment: 'Foreign key for the User table.'
            },

            book_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[transactions].[book_id] value must be a UUIDV4 type' },
                },
                comment: 'Foreign key for the Book table.'
            },
            
            borrow_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: { msg: '[transactions].[borrow_date] cannot be null!' },
                    notEmpty: { msg: '[transactions].[borrow_date] cannot be blank or empty!' },
                    isDate: { msg: '[transactions].[borrow_date] value must be a date type' }
                },
                comment: 'Date when this book is borrowed.'
            },

            return_date: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    isDate: { msg: '[transactions].[return_date] value must be a date type' }
                },
                comment: 'Date when this book is returned.'
            },

            due_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: { msg: '[transactions].[due_date] cannot be null!' },
                    notEmpty: { msg: '[transactions].[due_date] cannot be blank or empty!' },
                    isDate: { msg: '[transactions].[due_date] value must be a date type' }
                },
                comment: 'Date when this book is due to be returned.'
            },
            
            is_overdue: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: 'Indicates if this book is overdue.'
            },

            payment: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    isInt: { msg: '[transactions].[payment] value must be an integer' }
                },
                comment: 'Amount of money that the resident needs to pay for this overdue fee.'
            },

            returned_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[transactions].[returned_by] value must be a UUIDV4 type' },
                },
                comment: 'Foreign key for the User table.'
            },
        },
        {
            sequelize,
            modelName: 'Transaction',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Transaction;
};