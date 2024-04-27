const { Model } = require('sequelize')
const { sequelize } = require('../utils/db')

class Favorite extends Model {}

Favorite.init({}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'favorite'
})

module.exports = Favorite
