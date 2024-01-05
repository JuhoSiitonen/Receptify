// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);

const User = sequelize.define('User', {
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
  },
});

module.exports = User;