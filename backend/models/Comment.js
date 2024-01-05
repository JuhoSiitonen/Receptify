const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Comment extends Model {}

Comment.init({
  comment: {
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
    modelName: 'comment'
});

module.exports = Comment;