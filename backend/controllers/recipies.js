const recipyRouter = require("express").Router();
const { sessionChecker } = require("../utils/middleware");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Rating, Comment, Favorite } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../utils/db');


recipyRouter.get("/", async (req, res) => {
  try {
    let whereClause = {};
    let orderClause = [];

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
        '$user.username$': {
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

    if (req.query.sort) {
      orderClause.push([req.query.sort, req.query.order || 'ASC']);
      console.log('orderClause:', orderClause);
    }

    const recipes = await Recipy.findAll({
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
      where: whereClause,
      order: orderClause,
    });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500);
  }
});

recipyRouter.get("/favorites", async (req, res) => {
  try {
    let orderClause = [];

    if (req.query.sort) {
      let sorter = req.query.sort;
      if (req.query.sort === 'cookingTime') {
        sorter = 'cooking_time';
      } else if (req.query.sort === 'averageRating') {
        sorter = 'average_rating';
      } else {
        sorter = 'created_at';
      }
      orderClause.push([sequelize.literal('"userFavorites"."' + sorter + '"'), req.query.order || 'ASC']);
      console.log('orderClause:', orderClause)
    }

    const userId = req.session.userId;

    const user = await User.findByPk(userId, {
      include: [
        { model: Recipy, as: 'userFavorites', include: 
        [{ model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
          ],
          
        },
      ],
      order: orderClause,
    });

    console.log('user.userFavorites:', user.userFavorites);

    return res.status(200).json(user.userFavorites);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return res.status(500).end();
  }
});

recipyRouter.get("/subscriptions", sessionChecker, async (req, res) => {
  try {
    let orderClause = [];

    const subscribedUserIds = 
        JSON.parse(req.session.subscriptions)
        .map(user => user.id);
    
    if (req.query.sort) {
        orderClause.push([req.query.sort, req.query.order || 'ASC']);
        console.log('orderClause:', orderClause);
      }

    const recipes = await Recipy.findAll({
      where: {
        userId: subscribedUserIds
      },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'username'] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] }
      ],
      order: orderClause,
    });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching subscribed users recipes:', error);
    return res.status(500).end();
  }
});

recipyRouter.post("/", sessionChecker, async (req, res) => {
  try {
    const { title, description, instructions, visible, ingredients, categories, pictureUuid, cookingTime } = req.body;

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

    for (const ingredientData of ingredients) {
      const { name, amount, unit } = ingredientData;

      let ingredient = await Ingredient.findOne({ where: { name } });
      if (!ingredient) {
        ingredient = await Ingredient.create({ name });
      }

      await RecipyIngredient.create({
        amount,
        unit,
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
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
    });

    return res.status(201).json(returnRecipy);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500);
  }
});

recipyRouter.delete("/:id", sessionChecker, async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipy.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await RecipyIngredient.destroy({ where: { recipyId: recipe.id } });
    await RecipyCategory.destroy({ where: { recipyId: recipe.id } });
    await Rating.destroy({ where: { recipyId: recipe.id } });
    await Comment.destroy({ where: { recipyId: recipe.id } });
    await Favorite.destroy({ where: { recipyId: recipe.id } });
    await recipe.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500);
  }
});

recipyRouter.put("/:id", sessionChecker, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructions, date, visible, ingredients, categories, pictureUuid, cookingTime } = req.body;

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
      cookingTime,
      pictureUuid
    });

    let recipeIngredients = await RecipyIngredient.findAll({ where: { recipyId: recipe.id } });
    for (const singleIngredient of recipeIngredients) {
      await singleIngredient.destroy();
    }

    for (const ingredientData of ingredients) {
      const { name, amount, unit } = ingredientData;

      let ingredient = await Ingredient.findOne({ where: { name } });
      if (!ingredient) {
        ingredient = await Ingredient.create({ name });
      }

      let recipeIngredient = await RecipyIngredient.findOne({ where: { recipyId: recipe.id, ingredientId: ingredient.id } });
      if (!recipeIngredient) {
        recipeIngredient = await RecipyIngredient.create({
          amount,
          unit,
          visible: true,
          recipyId: recipe.id, 
          ingredientId: ingredient.id, 
        });
      } else {
        await recipeIngredient.update({
          amount,
          unit,
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
        await recipeCategory.update({ visible: true, recipyId: recipe.id, categoryId: category.id });
      }
    }

    const returnRecipy = await Recipy.findByPk(recipe.id,{
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include : [Category] },
      ],
    });
    return res.status(200).json(returnRecipy);
    
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500);
  }
});


module.exports = recipyRouter