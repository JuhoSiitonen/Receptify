const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'category'
});

module.exports = Category;