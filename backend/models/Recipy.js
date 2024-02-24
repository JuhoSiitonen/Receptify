const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Recipy extends Model {}

Recipy.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cookingTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  pictureUuid: {
    type: DataTypes.TEXT,
  },
}, {
    sequelize,
    underscored: true,
    modelName: 'recipy'
});

module.exports = Recipy;
