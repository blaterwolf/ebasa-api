'use strict';
const { Model } = require('sequelize');

// Bcrypt lib for encrypting password
const bcrypt = require('bcrypt');

// Include all protected attributes
const PROTECTED_ATTRIBUTES = ['password'];

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // >> User Table: Created by / Updated By / Verified By

        // % 1:M (hasMany) [users].[created_by] -> [users].[user_id]
        // % Admins adding other Admin
        this.hasMany(models.User, {
            foreignKey: 'created_by',
            as: 'created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [users].[user_id] -> [users].[created_by]
        // % Admin adding other Admins
        this.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'created_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[updated_by] -> [users].[user_id]
        // % Admins updating other Admin
        this.hasMany(models.User, {
            foreignKey: 'updated_by',
            as: 'updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [users].[user_id] -> [users].[updated_by]
        // % Admin updating other Admins
        this.belongsTo(models.User, {
            foreignKey: 'updated_by',
            as: 'updated_by_admin',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[verified_by] -> [users].[user_id]
        // % Admin/Librarian verifying Civilians
        this.hasMany(models.User, {
            foreignKey: 'verified_by',
            as: 'verified_by_admins',
            onDelete: 'RESTRICT',
        });

        // % M:1 (belongsTo) [users].[user_id] -> [users].[verified_by]
        // % Admins/Librarians verifying a Civilian
        this.belongsTo(models.User, {
            foreignKey: 'verified_by',
            as: 'verified_by_admin',
            onDelete: 'RESTRICT',
        });

        // >> Shelf Table: Created By / Updated By

        // % 1:M (hasMany) [users].[user_id] -> [shelves].[created_by]
        // % An admin adding many Shelf data
        this.hasMany(models.Shelf, {
            foreignKey: 'created_by',
            as: 'shelf_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [shelves].[updated_by]
        // % An admin updating many Shelf data
        this.hasMany(models.Shelf, {
            foreignKey: 'updated_by',
            as: 'shelf_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Language Table: Created By / Updated By

        // % 1:M (hasMany) [users].[user_id] -> [languages].[created_by]
        // % An admin adding many Language data
        this.hasMany(models.Language, {
            foreignKey: 'created_by',
            as: 'language_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [languages].[updated_by]
        // % An admin updating many Language data
        this.hasMany(models.Language, {
            foreignKey: 'updated_by',
            as: 'language_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Publisher Table: Created By / Updated By
        
        // % 1:M (hasMany) [users].[user_id] -> [publishers].[created_by]
        // % An admin adding many Publisher data
        this.hasMany(models.Publisher, {
            foreignKey: 'created_by',
            as: 'publisher_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [publishers].[updated_by]
        // % An admin updating many Publisher data
        this.hasMany(models.Publisher, {
            foreignKey: 'updated_by',
            as: 'publisher_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Genre Table: Created By / Updated By

        // % 1:M (hasMany) [users].[user_id] -> [genres].[created_by]
        // % An admin adding many Genre data
        this.hasMany(models.Genre, {
            foreignKey: 'created_by',
            as: 'genre_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [genres].[updated_by]
        // % An admin updating many Genre data
        this.hasMany(models.Genre, {
            foreignKey: 'updated_by',
            as: 'genre_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Author Table: Created By / Updated By

        // % 1:M (hasMany) [users].[user_id] -> [authors].[created_by]
        // % An admin adding many Author data
        this.hasMany(models.Author, {
            foreignKey: 'created_by',
            as: 'author_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [authors].[updated_by]
        // % An admin updating many Author data
        this.hasMany(models.Author, {
            foreignKey: 'updated_by',
            as: 'author_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Book Table: Created By / Updated By / Shelf ID / Language ID / Publisher ID / Genre ID / Author ID

        // % 1:M (hasMany) [users].[user_id] -> [books].[created_by]
        // % An admin adding many Book data
        this.hasMany(models.Book, {
            foreignKey: 'created_by',
            as: 'book_created_by_admins',
            onDelete: 'RESTRICT',
        });

        // % 1:M (hasMany) [users].[user_id] -> [books].[updated_by]
        // % An admin updating many Book data
        this.hasMany(models.Book, {
            foreignKey: 'updated_by',
            as: 'book_updated_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Transaction Table

        // % 1:1 (hasOne) [users].[user_id] -> [transactions].[user_id]
        // % One user can only have one transaction
        this.hasOne(models.Transaction, {
            foreignKey: 'user_id',
            as: 'transaction_user',
            onDelete: 'RESTRICT',
        });

        // % M:1 (hasMany) [users].[user_id] -> [transactions].[returned_by]
        // % Many admin/librarian can return the single transaction.
        this.hasMany(models.Transaction, {
            foreignKey: 'returned_by',
            as: 'returned_by_admins',
            onDelete: 'RESTRICT',
        });

        // >> Visit Log Table
        // % 1:M (hasMany) [users].[user_id] -> [visit_logs].[user_id]
        this.hasMany(models.Visit_Log, {
            foreignKey: 'user_id',
            as: 'visit_logs',
            onDelete: 'RESTRICT',
        });
        }

        toJSON() {
            const attributes = {...this.get()}
            for (const x of PROTECTED_ATTRIBUTES) {
                delete attributes[x];
            }
            return attributes;
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                comment: 'UUID for the User table.'
            },

            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[users].[first_name] cannot be null!' },
                    notEmpty: { msg: '[users].[first_name] cannot be blank or empty!' }
                },
                comment: 'User\'s first name.'
            },

            middle_name: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'User\'s middle name.'
            },

            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[users].[last_name] cannot be null' },
                    notEmpty: { msg: '[users].[last_name] cannot be blank or empty' }
                },
                comment: 'User\'s last name.'
            },

            full_name: {
                type: DataTypes.STRING,
                set(value) {
                    if (this.middle_name === undefined){
                        this.setDataValue('full_name', `${this.first_name} ${this.last_name}`);
                    }
                    else{
                        this.setDataValue(
                            "full_name", 
                            `${this.first_name} ${this.middle_name.charAt(0).toUpperCase()}. ${this.last_name}`
                        );
                    }
                }
            },

            email_address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { 
                    isEmail: { args: true, msg: '[users].[email_address] must be unique!' },
                    notNull: { msg: '[users].[email_address] cannot be null!' },
                    notEmpty: { msg: '[users].[email_address] cannot be blank or empty!' }
                },
                unique: { msg: 'Email must be unique. '},
                comment: 'User\'s email address.'
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                notNull: { msg: '[users].[password] cannot be null' },
                notEmpty: { msg: '[users].[password] cannot be blank or empty' },
                },
                comment: 'This contains the encrypted password for authorization'
            },

            user_type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { 
                    notNull: { msg: '[users].[user_type] cannot be null' },
                    isIn: {
                        args: [[ 'Admin', 'Librarian', 'Resident' ]],
                        msg: '[users].[user_type] value must be `Admin`, `Librarian` or `Resident` only'
                    }
                },
                comment: 'This contains the identification of a user.'
            },

            contact_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[users].[contact_number] cannot be null' },
                    notEmpty: { msg: '[users].[contact_number] cannot be blank or empty' },

                },
                comment: 'This contains the contact number of the user.'
            },

            profile_pic: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'This contains the profile picture of the user.',
                get() {
                    const rawValue = this.getDataValue('profile_pic');
                    return rawValue ? "http://localhost:3600/public/" + rawValue : null;
                }
            },

            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: 'This indicates if the account of a user is verified or not'
            },

            barangay_card: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'This contains the barangay card of the user.'
            },

            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
                }, 
                comment: 'This column is specifically for Admin and Librarian, that determines who created the user.'
            },

            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who updated the user.'

            },

            verified_by: {
                type: DataTypes.UUID,
                allowNull: true,
                validate: {
                    isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
                },
                comment: 'This column is specifically for Admin and Librarian, that determines who verified the Civilian in the API.'
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: '[users].[status] cannot be null' },
                    isIn: {
                        args: [[ 'Active', 'Inactive' ]],
                        msg: '[users].[status] value must be `Active` or `Inactive` only'
                    }
                },
            }
        }, 
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // tableName: 'users', -> to change table name.

        hooks: {
            beforeCreate: (user) => {
                // Encrypt user's password before getting sent to the database. 
                user.password = bcrypt.hashSync(user.password, 10);
            },

            afterCreate: () => {
                if(process.env.ENABLE_MODEL_LOG === 'true') {
                    console.log('A new record has been added to table [users]');
                }
            }
        }
    });
    return User;
};