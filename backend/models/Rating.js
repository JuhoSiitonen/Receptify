const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);
const User = require('./User');
const Recipy = require('./Recipy');

const Rating = sequelize.define('Rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Rating.belongsTo(User);
Rating.belongsTo(Recipy);

module.exports = Rating;