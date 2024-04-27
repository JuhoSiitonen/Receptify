const { Op } = require('sequelize')
const { Ingredient, RecipyIngredient } = require('../models')

const checkAndCreateIngredients = async (name) => {
  let ingredient = await Ingredient.findOne({ where: { name } })
  if (!ingredient) {
    ingredient = await Ingredient.create({ name })
  }
  return ingredient
}

const findAllIngredients = async (req, res) => {
  const { ingredients } = req.body

  const foundIngredients = await Ingredient.findAll({
    where: {
      name: {
        [Op.in]: ingredients
      }
    }
  })
  return foundIngredients
}

const getAllIngredients = async () => {
  const ingredients = await Ingredient.findAll()
  return ingredients
}

const createRecipyIngredient = async (ingredientId, recipyId, amount, unit) => {
  const recipyIngredient = await RecipyIngredient.create({
    amount,
    unit,
    visible: true,
    recipyId,
    ingredientId
  })
  return recipyIngredient
}

const updateRecipyIngredient = async (ingredientId, recipyId, amount, unit) => {
  const recipyIngredient = await RecipyIngredient.findOne({ where: { recipyId, ingredientId } })
  await recipyIngredient.update({
    amount,
    unit
  })
  return recipyIngredient
}

const findRecipyIngredients = async (recipyId) => {
  const recipeIngredients = await RecipyIngredient.findAll({ where: { recipyId } })
  return recipeIngredients
}

const findRecipiesAccordingToIngredients = async (ingredientIds) => {
  const recipeIds = await RecipyIngredient.findAll({
    where: {
      ingredientId: {
        [Op.in]: ingredientIds
      }
    },
    attributes: ['recipyId'],
    raw: true
  })
  return recipeIds
}

const findSingleRecipyIngredient = async (recipyId, ingredientId) => {
  const recipeIngredient = await RecipyIngredient.findOne({ where: { recipyId, ingredientId } })
  return recipeIngredient
}

const destroySingleIngredient = async (recipyId, ingredientId) => {
  const recipyIngredient = await RecipyIngredient.destroy({
    where: {
      recipyId,
      ingredientId
    }
  })
  return recipyIngredient
}

module.exports = {
  checkAndCreateIngredients,
  findAllIngredients,
  getAllIngredients,
  createRecipyIngredient,
  updateRecipyIngredient,
  findRecipyIngredients,
  findRecipiesAccordingToIngredients,
  findSingleRecipyIngredient,
  destroySingleIngredient
}
