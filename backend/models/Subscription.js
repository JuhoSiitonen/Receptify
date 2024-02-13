const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Subscription extends Model {}

Subscription.init({}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'friend'
    });

module.exports = Subscription;