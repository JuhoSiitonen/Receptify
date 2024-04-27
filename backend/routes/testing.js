const testingRouter = require('express').Router()
const { User, Recipy, Rating, Ingredient, Category, RecipyCategory, RecipyIngredient, Comment, Subscription, Favorite } = require('../models')

testingRouter.post('/reset', async (request, response) => {
  await RecipyIngredient.destroy({ where: {} })
  await RecipyCategory.destroy({ where: {} })
  await Ingredient.destroy({ where: {} })
  await Category.destroy({ where: {} })
  await Rating.destroy({ where: {} })
  await Comment.destroy({ where: {} })
  await Subscription.destroy({ where: {} })
  await Favorite.destroy({ where: {} })
  await Recipy.destroy({ where: {} })
  await User.destroy({ where: {} })
  response.status(204).end()
}
)

module.exports = testingRouter
