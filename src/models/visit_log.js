'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Visit_Log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

        // % M:1 (belongsTo) [visit_logs].[user_id] -> [users].[user_id]
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'visit_log_by',
            onDelete: 'RESTRICT',
        });
        }
    }

    Visit_Log.init(
    {
        visit_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'UUID for the Visit_Log table.'
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[visit_logs].[user_id] must be a valid UUID!' }
            },
            comment: 'user_id references the user_id in the User table.'
        },
    }, 
    {
        sequelize,
        modelName: 'Visit_Log',
        timestamps: true,
        createdAt: 'visit_date',
        updatedAt: false,
    }
    );
    return Visit_Log;
};