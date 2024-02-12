const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class RecipyCategory extends Model {}

class Friend extends Model {}

Friend.init({}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'friend'
    });

module.exports = Friend;