// models/Recipy.js
const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);
const User = require('./User');

const Recipy = sequelize.define('Recipy', {
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
});

Recipy.belongsTo(User);

module.exports = Recipy;
