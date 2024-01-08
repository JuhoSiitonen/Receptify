const testingRouter = require('express').Router()
const { User, Recipy, Rating, Ingredient, Category, RecipyCategory, RecipyIngredient } = require('../models')

testingRouter.post('/reset', async (request, response) => {
    await User.destroy({ where: {} })
    await Recipy.destroy({ where: {} })
    await Rating.destroy({ where: {} })
    await Comment.destroy({ where: {} })
    await Ingredient.destroy({ where: {} })
    await Category.destroy({ where: {} })
    await RecipyIngredient.destroy({ where: {} })
    await RecipyCategory.destroy({ where: {} })

    response.status(204).end()
    }
)

module.exports = testingRouter