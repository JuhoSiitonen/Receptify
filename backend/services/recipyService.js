const { Op } = require('sequelize')
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Favorite, Rating, Comment } = require('../models')

const findSingleRecipyById = async (id) => {
  const recipy = await Recipy.findByPk(id)
  return recipy
}

const findUsersRecipies = async (id, length) => {
  const recipes = await Recipy.findAll({
    where: { userId: id },
    include: [
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'username']
      },
      { model: RecipyIngredient, include: [Ingredient] },
      { model: RecipyCategory, include: [Category] }
    ],
    limit: 5,
    offset: length
  })
  return recipes
}

const defineWhereClause = (req, res) => {
  let whereClause = {}

  if (req.query.title) {
    whereClause = {
      ...whereClause,
      title: {
        [Op.like]: `%${req.query.title}%`
      }
    }
  }

  if (req.query.favorites) {
    const favorites =
        JSON.parse(req.session.userFavorites)
          .map(favorite => favorite.id)

    whereClause = {
      ...whereClause,
      id: favorites
    }
  }

  if (req.query.subscribed) {
    const subscribedUserIds =
          JSON.parse(req.session.subscriptions)
            .map(user => user.id)

    whereClause = {
      ...whereClause,
      userId: subscribedUserIds
    }
  }

  return whereClause
}

const defineIngredientClause = (req, res) => {
  let ingredientClause = {}

  if (req.query.ingredients) {
    ingredientClause = {
      name: {
        [Op.like]: `%${req.query.ingredients}%`
      }
    }
  }

  return ingredientClause
}

const defineCategoryClause = (req, res) => {
  let categoryClause = {}

  if (req.query.categories) {
    categoryClause = {
      name: {
        [Op.like]: `%${req.query.categories}%`
      }
    }
  }

  return categoryClause
}

const defineUserClause = (req, res) => {
  let userClause = {}

  if (req.query.username) {
    userClause = {
      username: {
        [Op.like]: `%${req.query.username}%`
      }
    }
  }

  return userClause
}

const findAllRecipies = async (
  whereClause, orderClause, length, limit, ingredientClause, categoryClause, userClause) => {
  length = length || 0
  limit = limit || 5
  const foundRecipes = await Recipy.findAll({
    include: [
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'username'],
        where: userClause
      },
      {
        model: RecipyIngredient,
        include: [
          {
            model: Ingredient,
            where: ingredientClause
          }
        ]
      },
      {
        model: RecipyCategory,
        include: [
          {
            model: Category,
            where: categoryClause
          }
        ]
      }
    ],
    where: whereClause,
    order: orderClause,
    limit,
    offset: length
  })
  return foundRecipes
}

const createNewRecipy = async (req, res) => {
  const { title, description, instructions, visible, pictureUuid, cookingTime } = req.body
  const recipe = await Recipy.create({
    title,
    description,
    instructions,
    visible,
    userId: req.session.userId,
    averageRating: 0,
    cookingTime,
    pictureUuid
  })
  await User.increment('number_of_recipes', { where: { id: req.session.userId } })
  return recipe
}

const updateExistingRecipy = async (req, res) => {
  const { id } = req.params
  const { title, description, instructions, date, visible, pictureUuid, cookingTime } = req.body
  const recipe = await Recipy.findByPk(id)
  await recipe.update({
    title,
    description,
    instructions,
    date,
    visible,
    cookingTime,
    pictureUuid
  })
  return recipe
}

const findFullSingleRecipyById = async (id) => {
  const returnRecipy = await Recipy.findByPk(id, {
    include: [
      { model: User, as: 'owner', attributes: ['id', 'username'] },
      { model: RecipyIngredient, include: [Ingredient] },
      { model: RecipyCategory, include: [Category] }
    ]
  })
  return returnRecipy
}

const deleteSingleRecipy = async (req, res) => {
  const { id } = req.params
  await RecipyIngredient.destroy({ where: { recipyId: id } })
  await RecipyCategory.destroy({ where: { recipyId: id } })
  await Rating.destroy({ where: { recipyId: id } })
  await Comment.destroy({ where: { recipyId: id } })
  await Favorite.destroy({ where: { recipyId: id } })
  if (!req.session.admin) {
    await User.decrement('number_of_recipes', { where: { id: req.session.userId } })
  }
  const success = await Recipy.destroy({ where: { id } })
  return success
}

module.exports = {
  findSingleRecipyById,
  findFullSingleRecipyById,
  findUsersRecipies,
  defineWhereClause,
  defineIngredientClause,
  defineCategoryClause,
  defineUserClause,
  findAllRecipies,
  createNewRecipy,
  updateExistingRecipy,
  deleteSingleRecipy
}
