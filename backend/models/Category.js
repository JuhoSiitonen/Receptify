const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
});

module.exports = Category;