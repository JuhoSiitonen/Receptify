const { Op } = require('sequelize');
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Favorite, Rating, Comment } = require("../models");

const findSingleRecipyById = async (id) => {
    const recipy = await Recipy.findByPk(id);
    return recipy;
}

const findUsersRecipies = async (id, length) => {
    const recipes = await Recipy.findAll({ where: { userId: id},
        include: [
          { model: User,
            as: 'owner',
            attributes: [ "id", "username"] },
          { model: RecipyIngredient, include: [Ingredient] },
          { model: RecipyCategory, include: [Category] },
        ],
        limit: 5,
        offset: length,
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

const findAllRecipies = async ( whereClause, orderClause, length) => {
    length = length || 0;
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
        limit: 5,
        offset: length,
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
    await User.increment('number_of_recipes', { where: { id: req.session.userId } });
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
    await User.decrement('number_of_recipes', { where: { id: req.session.userId } });
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
    deleteSingleRecipy,
}