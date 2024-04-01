const { Op } = require('sequelize');
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite, Rating, Comment } = require("../models");

const findSingleRecipyById = async (id) => {
    const recipy = await Recipy.findByPk(id);
    return recipy;
}

const findUsersRecipies = async (id) => {
    const recipes = await Recipy.findAll({ where: { userId: id},
        include: [
          { model: User,
            as: 'owner',
            attributes: [ "id", "username"] },
          { model: RecipyIngredient, include: [Ingredient] },
          { model: RecipyCategory, include: [Category] },
        ],
    });
    return recipes;
}

const defineWhereClause = ( req, res) => {
    let whereClause = {};

    if (req.query.title) {
        whereClause = { 
          ...whereClause, 
          title: {
            [Op.like]: `%${req.query.title}%`
          }};
      }
  
    if (req.query.ingredients) {
        whereClause = {
          ...whereClause,
          '$recipy_ingredients.ingredient.name$': {
            [Op.like]: `%${req.query.ingredients}%`
          }
        };
      }
  
    if (req.query.username) {
        whereClause = {
          ...whereClause,
          '$owner.username$': {
            [Op.like]: `%${req.query.username}%`
          }
        };
      }
  
    if (req.query.categories) {
        whereClause = {
          ...whereClause,
          '$recipy_categories.category.name$': {
            [Op.like]: `%${req.query.categories}%`
          }
        };
      }

    return whereClause;
}

const findAllRecipies = async ( whereClause, orderClause) => {
    const foundRecipes = await Recipy.findAll({
        include: [
          { model: User,
            as: 'owner',
            attributes: [ "id", "username"] },
          { model: RecipyIngredient, include: [Ingredient] },
          { model: RecipyCategory, include: [Category] },
        ],
        where: whereClause,
        order: orderClause,
      })
    return foundRecipes;
}

const createNewRecipy = async (req, res) => {
    const { title, description, instructions, visible, pictureUuid, cookingTime } = req.body;
    const recipe = await Recipy.create({
        title,
        description,
        instructions,
        visible,
        userId: req.session.userId, 
        averageRating: 0,
        cookingTime,
        pictureUuid
    });
    return recipe;
}

const updateExistingRecipy = async (req, res) => {
    const { id } = req.params;
    const { title, description, instructions, date, visible, pictureUuid, cookingTime } = req.body;
    const recipe = await Recipy.findByPk(id);
    await recipe.update({
        title,
        description,
        instructions,
        date,
        visible,
        cookingTime,
        pictureUuid
    });
    return recipe;
}

const checkAndCreateIngredients = async (name) => {
    let ingredient = await Ingredient.findOne({ where: { name } });
    if (!ingredient) {
        ingredient = await Ingredient.create({ name });
    }
    return ingredient;
}

const createRecipyIngredient = async (ingredientId, recipyId, amount, unit) => {
    let recipyIngredient = await RecipyIngredient.create({
        amount,
        unit,
        visible: true,
        recipyId, 
        ingredientId, 
    });
    return recipyIngredient;
}

const updateRecipyIngredient = async (ingredientId, recipyId, amount, unit) => {
    let recipyIngredient = await RecipyIngredient.findOne({ where: { recipyId: recipyId, ingredientId: ingredientId } });
    await recipyIngredient.update({
        amount,
        unit,
    });
    return recipyIngredient;
}

const findRecipyIngredients = async (recipyId) => {
    let recipeIngredients = await RecipyIngredient.findAll({ where: { recipyId } });
    return recipeIngredients;
}

const findSingleRecipyIngredient = async (recipyId, ingredientId) => {
    let recipeIngredient = await RecipyIngredient.findOne({ where: { recipyId, ingredientId } })
    return recipeIngredient;
}

const destroySingleIngredient = async (recipyId, ingredientId) => {
    let recipyIngredient = await RecipyIngredient.destroy({
        where: {
          recipyId: recipyId,
          ingredientId: ingredientId,
        }
    });
    return recipyIngredient;
}

const checkAndCreateCategories = async (name) => {
    let category = await Category.findOne({ where: { name } });
    if (!category) {
        category = await Category.create({ name });
    }
    return category;
}

const createRecipyCategory = async (recipyId, categoryId) => {
    const recipyCategory = await RecipyCategory.create({
        visible: true,
        recipyId, 
        categoryId, 
    });
    return recipyCategory;
}

const findRecipyCategories = async (recipyId) => {
    let recipeCategories = await RecipyCategory.findAll({ where: { recipyId: recipyId } });
    return recipeCategories;
}

const findSingleRecipyCategory = async (recipyId, categoryId) => {
    let recipeCategory = await RecipyCategory.findOne({ where: { recipyId, categoryId } });
    return recipeCategory;
}

const destroyRecipyCategories = async (recipyId) => {
    let recipyCategory = await RecipyCategory.destroy({
        where: { recipyId }
    });
    return recipyCategory;
}

const findFullSingleRecipyById = async (id) => {
    const returnRecipy = await Recipy.findByPk(id,{
        include: [
          { model: User, as: 'owner', attributes: [ "id", "username"] },
          { model: RecipyIngredient, include: [Ingredient] },
          { model: RecipyCategory, include: [Category] },
        ],
    });
    return returnRecipy;
}

const deleteSingleRecipy = async (id) => {
    await RecipyIngredient.destroy({ where: { recipyId: id } });
    await RecipyCategory.destroy({ where: { recipyId: id } });
    await Rating.destroy({ where: { recipyId: id } });
    await Comment.destroy({ where: { recipyId: id } });
    await Favorite.destroy({ where: { recipyId: id } });
    const success = await Recipy.destroy({ where: { id } });
    return success;
}

module.exports = {
    findSingleRecipyById,
    findFullSingleRecipyById,
    findUsersRecipies,
    defineWhereClause,
    findAllRecipies,
    createNewRecipy,
    updateExistingRecipy,
    checkAndCreateIngredients,
    createRecipyIngredient,
    findSingleRecipyIngredient,
    updateRecipyIngredient,
    checkAndCreateCategories,
    createRecipyCategory,
    findRecipyCategories,
    findSingleRecipyCategory,
    destroyRecipyCategories,
    deleteSingleRecipy,
    findRecipyIngredients,
    destroySingleIngredient,
}