const { DataTypes } = require('sequelize');
const sequelize = require(process.env.DATABASE_URL);
const Recipy = require('./Recipy');
const Category = require('./Category');

const RecipyCategory = sequelize.define('RecipyCategory', {
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

RecipyCategory.belongsTo(Recipy);
RecipyCategory.belongsTo(Category);

module.exports = RecipyCategory;