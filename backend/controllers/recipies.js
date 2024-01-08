const recipyRouter = require("express").Router();
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory } = require('../models');

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

recipyRouter.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.findAll({
      where: { recipyId: id },
      include: [
        { model: User },],});
    return res.status(200).json(comments);

  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

recipyRouter.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const recipe = await Recipy.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const comment = await Comment.create({
      content,
      userId: user.id, 
      recipyId: recipe.id, 
    });

    const returnComment = await Comment.findByPk(comment.id, {
      include: [
        { model: User },],});

    return res.status(201).json(returnComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = recipyRouter