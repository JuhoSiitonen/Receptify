const categoryService = require('../services/categoryService')
const ingredientService = require('../services/ingredientService')
const recipyService = require('../services/recipyService')

const getRecipies = async (req, res) => {
  try {
    let whereClause = recipyService.defineWhereClause(req, res)
    const orderClause = []
    const ingredientClause = recipyService.defineIngredientClause(req, res)
    const categoryClause = recipyService.defineCategoryClause(req, res)
    const userClause = recipyService.defineUserClause(req, res)
    const length = req.query.length || 0

    if (req.query.sort) {
      orderClause.push([req.query.sort, req.query.order || 'DESC'])
    } else {
      orderClause.push(['created_at', 'DESC'])
    }

    const foundRecipes = await recipyService.findAllRecipies(
      whereClause, orderClause, length, 5, ingredientClause, categoryClause, userClause)
    const recipeIds = foundRecipes.map(recipe => recipe.id)
    whereClause = { id: recipeIds }
    const recipes = await recipyService.findAllRecipies(whereClause, orderClause)

    return res.status(200).json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return res.status(500).end()
  }
}

const addRecipy = async (req, res) => {
  try {
    const { ingredients, categories } = req.body

    const recipe = await recipyService.createNewRecipy(req, res)

    for (const ingredientData of ingredients) {
      const { name, amount, unit } = ingredientData
      const ingredient = await ingredientService.checkAndCreateIngredients(name)
      const recipeIngredient = await ingredientService.createRecipyIngredient(ingredient.id, recipe.id, amount, unit)
    }

    for (const categoryData of categories) {
      const { name } = categoryData
      const category = await categoryService.checkAndCreateCategories(name)
      const recipeCategory = await categoryService.createRecipyCategory(recipe.id, category.id)
    }

    const returnRecipy = await recipyService.findFullSingleRecipyById(recipe.id)

    return res.status(201).json(returnRecipy)
  } catch (error) {
    console.error('Error creating recipe:', error)
    return res.status(500).end()
  }
}

const deleteRecipy = async (req, res) => {
  try {
    const { id } = req.params

    const recipe = await recipyService.findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    if (recipe.userId !== req.session.userId && !req.session.admin) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const deletion = await recipyService.deleteSingleRecipy(req, res)

    return res.status(204).end()
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return res.status(500).end()
  }
}

const updateRecipy = async (req, res) => {
  try {
    const { id } = req.params
    const { ingredients, categories } = req.body

    const recipe = await recipyService.findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    const update = await recipyService.updateExistingRecipy(req, res)
    const recipeIngredients = await ingredientService.findRecipyIngredients(id)

    for (const singleIngredient of recipeIngredients) {
      const success = await ingredientService.destroySingleIngredient(singleIngredient.recipyId, singleIngredient.ingredientId)
    }

    for (const ingredientData of ingredients) {
      const { name, amount, unit } = ingredientData

      const ingredient = await ingredientService.checkAndCreateIngredients(name)
      let recipeIngredient = await ingredientService.findSingleRecipyIngredient(recipe.id, ingredient.id)

      if (!recipeIngredient) {
        recipeIngredient = await ingredientService.createRecipyIngredient(ingredient.id, recipe.id, amount, unit)
      } else {
        recipeIngredient = await ingredientService.updateRecipyIngredient(ingredient.id, recipe.id, amount, unit)
      }
    }

    const success = categoryService.destroyRecipyCategories(recipe.id)

    for (const categoryData of categories) {
      const { name } = categoryData

      const category = await categoryService.checkAndCreateCategories(name)
      let recipeCategory = await categoryService.findSingleRecipyCategory(recipe.id, category.id)

      if (!recipeCategory) {
        recipeCategory = await categoryService.createRecipyCategory(recipe.id, category.id)
      }
    }

    const returnRecipy = await recipyService.findFullSingleRecipyById(recipe.id)

    return res.status(200).json(returnRecipy)
  } catch (error) {
    console.error('Error updating recipe:', error)
    return res.status(500).end()
  }
}

const findRecipy = async (req, res) => {
  try {
    const { ingredients } = req.body

    const foundIngredients = await ingredientService.findAllIngredients(req, res)
    const ingredientIds = foundIngredients.map(ingredient => ingredient.id)
    const recipeIds = await ingredientService.findRecipiesAccordingToIngredients(ingredientIds)
    const foundRecipeIds = recipeIds.map(recipe => recipe.recipyId)
    const whereClause = { id: foundRecipeIds }
    const orderClause = []
    const recipes = await recipyService.findAllRecipies(whereClause, orderClause)

    recipes.sort((a, b) => {
      const aMatchCount = a.recipy_ingredients.filter(
        (ingredient) => ingredient.ingredient && ingredients.includes(ingredient.ingredient.name)
      ).length
      const bMatchCount = b.recipy_ingredients.filter(
        (ingredient) => ingredient.ingredient && ingredients.includes(ingredient.ingredient.name)
      ).length
      return bMatchCount - aMatchCount
    })

    return res.status(200).json(recipes)
  } catch (error) {
    console.error('Error searching recipes by ingredients:', error)
    throw error
  }
}

const getUsersRecipies = async (req, res) => {
  try {
    const whereClause = { userId: req.session.userId }
    const orderClause = []
    const length = 0
    const limit = 999
    const recipes = await recipyService.findAllRecipies(whereClause, orderClause, length, limit)

    return res.status(200).json(recipes)
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    return res.status(500).end()
  }
}

const getSingleRecipy = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await recipyService.findFullSingleRecipyById(id)

    return res.status(200).json(recipe)
  } catch (error) {
    console.error('Error fetching single recipe:', error)
    return res.status(500).end()
  }
}

const getIngredients = async (req, res) => {
  try {
    const ingredients = await ingredientService.getAllIngredients(req, res)

    return res.status(200).json(ingredients)
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return res.status(500).end()
  }
}

module.exports = {
  getRecipies,
  addRecipy,
  deleteRecipy,
  updateRecipy,
  findRecipy,
  getUsersRecipies,
  getSingleRecipy,
  getIngredients
}
