const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);
const Recipy = require('./Recipy');
const Ingredient = require('./Ingredient');

const RecipyIngredient = sequelize.define('RecipyIngredient', {
  amount: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

RecipyIngredient.belongsTo(Recipy);
RecipyIngredient.belongsTo(Ingredient);

module.exports = RecipyIngredient;