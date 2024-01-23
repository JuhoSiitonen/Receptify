const recipyRouter = require("express").Router();
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Rating, Comment } = require('../models');

recipyRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipy.findAll({
      include: [
        { model: User },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
    });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

recipyRouter.post("/", async (req, res) => {
  try {
    const { title, description, instructions, date, visible, userId, ingredients, categories } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const recipe = await Recipy.create({
      title,
      description,
      instructions,
      date,
      visible,
      userId: user.id, 
      averageRating: 0,
    });

    for (const ingredientData of ingredients) {
      const { name, amount } = ingredientData;
      console.log(name, amount)

      let ingredient = await Ingredient.findOne({ where: { name } });
      if (!ingredient) {
        ingredient = await Ingredient.create({ name });
      }

      console.log(ingredient)
      console.log(recipe.id)

      await RecipyIngredient.create({
        amount,
        visible: true,
        recipyId: recipe.id, 
        ingredientId: ingredient.id, 
      });
    }

    for (const categoryData of categories) {
      const { name } = categoryData;

      let category = await Category.findOne({ where: { name } });
      if (!category) {
        category = await Category.create({ name });
      }

      await RecipyCategory.create({
        visible: true,
        recipyId: recipe.id, 
        categoryId: category.id, 
      });
    }

    const returnRecipy = await Recipy.findByPk(recipe.id,{
      include: [
        { model: User },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
    });

    return res.status(201).json(returnRecipy);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

recipyRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipy.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipe.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

recipyRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructions, date, visible, ingredients, categories } = req.body;

    const recipe = await Recipy.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipe.update({
      title,
      description,
      instructions,
      date,
      visible,
    });

    let recipeIngredients = await RecipyIngredient.findAll({ where: { recipyId: recipe.id } });
    for (const singleIngredient of recipeIngredients) {
      await singleIngredient.destroy();
    }

    for (const ingredientData of ingredients) {
      const { name, amount } = ingredientData;

      let ingredient = await Ingredient.findOne({ where: { name } });
      if (!ingredient) {
        ingredient = await Ingredient.create({ name });
      }

      let recipeIngredient = await RecipyIngredient.findOne({ where: { recipyId: recipe.id, ingredientId: ingredient.id } });
      if (!recipeIngredient) {
        recipeIngredient = await RecipyIngredient.create({
          amount,
          visible: true,
          recipyId: recipe.id, 
          ingredientId: ingredient.id, 
        });
      } else {
        await recipeIngredient.update({
          amount,
          visible: true,
          recipyId: recipe.id, 
          ingredientId: ingredient.id, 
        });
      }
    }

    let recipeCategories = await RecipyCategory.findAll({ where: { recipyId: recipe.id } });
    for (const singleCategory of recipeCategories) {
      await singleCategory.destroy();
    }

    for (const categoryData of categories) {
      const { name } = categoryData;

      let category = await Category.findOne({ where: { name } });
      if (!category) {
        category = await Category.create({ name });
      }

      let recipeCategory = await RecipyCategory.findOne({ where: { recipyId: recipe.id, categoryId: category.id } });
      if (!recipeCategory) {
        recipeCategory = await RecipyCategory.create({
          visible: true,
          recipyId: recipe.id, 
          categoryId: category.id, 
        });
      } else {
        await recipeCategory.update({
          visible: true,
          recipyId: recipe.id, 
          categoryId: category.id, 
        });
      }
    }

    const returnRecipy = await Recipy.findByPk(recipe.id,{
      include: [
        { model: User },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include : [Category] },
      ],
    });
    return res.status(200).json(returnRecipy);
    
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = recipyRouter