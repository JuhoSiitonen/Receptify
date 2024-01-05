const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Recipy extends Model {}

Recipy.init({
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
  date: {
    type: DataTypes.TIMESTAMP,
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
    modelName: 'recipy'
});

module.exports = Recipy;
