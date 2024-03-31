const { Op } = require('sequelize');
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");

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

module.exports = {
    findSingleRecipyById,
    findUsersRecipies,
    defineWhereClause,
    findAllRecipies,
}