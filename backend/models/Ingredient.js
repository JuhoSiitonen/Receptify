const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);

const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
});

module.exports = Ingredient;