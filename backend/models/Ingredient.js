const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Ingredient extends Model {}

Ingredient.init({
  name: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'ingredient'
});

module.exports = Ingredient;