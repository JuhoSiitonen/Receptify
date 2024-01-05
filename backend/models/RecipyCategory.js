const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class RecipyCategory extends Model {}

RecipyCategory.init({
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'recipy_category'
});

module.exports = RecipyCategory;