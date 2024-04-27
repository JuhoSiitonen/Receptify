const { Model } = require('sequelize')
const { sequelize } = require('../utils/db')

class Subscription extends Model {}

Subscription.init({}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'subscription'
})

module.exports = Subscription
