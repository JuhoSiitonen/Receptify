const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class User extends Model {}

User.init({
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
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
});

module.exports = User;