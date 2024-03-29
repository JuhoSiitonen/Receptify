const ingredientRouter = require('express').Router();
const { Ingredient, Recipy, RecipyIngredient } = require('../models');

ingredientRouter.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      include: [
        { model: RecipyIngredient, include: [Recipy] },
      ],
    });

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return res.status(500);
  }
});

module.exports = ingredientRouter;