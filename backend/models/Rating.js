const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Rating extends Model {}

Rating.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'rating'
})

module.exports = Rating
