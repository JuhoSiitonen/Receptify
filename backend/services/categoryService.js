const { Op } = require('sequelize')
const { Category, RecipyCategory } = require('../models')

const checkAndCreateCategories = async (name) => {
  let category = await Category.findOne({ where: { name } })
  if (!category) {
    category = await Category.create({ name })
  }
  return category
}

const createRecipyCategory = async (recipyId, categoryId) => {
  const recipyCategory = await RecipyCategory.create({
    visible: true,
    recipyId,
    categoryId
  })
  return recipyCategory
}

const findRecipyCategories = async (recipyId) => {
  const recipeCategories = await RecipyCategory.findAll({ where: { recipyId } })
  return recipeCategories
}

const findSingleRecipyCategory = async (recipyId, categoryId) => {
  const recipeCategory = await RecipyCategory.findOne({ where: { recipyId, categoryId } })
  return recipeCategory
}

const destroyRecipyCategories = async (recipyId) => {
  const recipyCategory = await RecipyCategory.destroy({
    where: { recipyId }
  })
  return recipyCategory
}

module.exports = {
  checkAndCreateCategories,
  createRecipyCategory,
  findRecipyCategories,
  findSingleRecipyCategory,
  destroyRecipyCategories
}
