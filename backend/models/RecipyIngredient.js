const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class RecipyIngredient extends Model {}

RecipyIngredient.init({
  amount: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'recipy_ingredient'
});

module.exports = RecipyIngredient;