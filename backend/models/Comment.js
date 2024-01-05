const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);
const User = require('./User');
const Recipy = require('./Recipy');

const Comment = sequelize.define('Comment', {
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
});

Comment.belongsTo(User);
Comment.belongsTo(Recipy);

module.exports = Comment;