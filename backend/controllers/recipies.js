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

    if (req.query.sort) {
      orderClause.push([req.query.sort, req.query.order || 'DESC']);
    } else {
      orderClause.push(['created_at', 'DESC']);
    }

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
    
    
    const recipeIds = foundRecipes.map(recipe => recipe.id);

    const recipes = await Recipy.findAll({
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"]},
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
      where: { id: recipeIds },
      order: orderClause,
    });
    

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).end();
  }
});

recipyRouter.get("/favorites", async (req, res) => {
  try {
    let orderClause = [];
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

    if (req.query.sort) {
      orderClause.push([req.query.sort, req.query.order || 'DESC']);
    }

    const favorites = 
      JSON.parse(req.session.userFavorites)
      .map(favorite => favorite.id);

    whereClause = {
      ...whereClause,
      id: favorites
    };

    const foundRecipes = await Recipy.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'owner', attributes: ['id', 'username'] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] }
      ],
      order: orderClause,
    });

    const recipeIds = foundRecipes.map(recipe => recipe.id);

    const recipes = await Recipy.findAll({
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"]},
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
      where: { id: recipeIds },
      order: orderClause,
    });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return res.status(500).end();
  }
});

recipyRouter.get("/subscriptions", sessionChecker, async (req, res) => {
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

    if (req.query.sort) {
      orderClause.push([req.query.sort, req.query.order || 'DESC']);
    }

    const subscribedUserIds = 
        JSON.parse(req.session.subscriptions)
        .map(user => user.id);
    
    whereClause = {
      ...whereClause,
      userId: subscribedUserIds
    };

    const foundRecipes = await Recipy.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'owner', attributes: ['id', 'username'] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] }
      ],
      order: orderClause,
    });

    const recipeIds = foundRecipes.map(recipe => recipe.id);

    const recipes = await Recipy.findAll({
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"]},
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
      where: { id: recipeIds },
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
        { model: User, as: 'owner', attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
    });

    return res.status(201).json(returnRecipy);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).end();
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
    return res.status(500).end();
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
        { model: User, as: 'owner', attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include : [Category] },
      ],
    });
    return res.status(200).json(returnRecipy);
    
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500).end();
  }
});

recipyRouter.post("/search", async (req, res) => {
  try {
    const { ingredients } = req.body;

    const foundIngredients = await Ingredient.findAll({
      where: {
        name: {
          [Op.in]: ingredients
        }
      }
    });

    const ingredientIds = foundIngredients.map(ingredient => ingredient.id);

    const recipeIds = await RecipyIngredient.findAll({
      where: {
        ingredientId: {
          [Op.in]: ingredientIds
        }
      },
      attributes: ['recipyId'],
      raw: true
    });

    const foundRecipeIds = recipeIds.map(recipe => recipe.recipyId);

    const recipes = await Recipy.findAll({
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
      where: {
        id: {
          [Op.in]: foundRecipeIds
        }
      }
    })

    recipes.sort((a, b) => {
      const aMatchCount = a.recipy_ingredients.filter(
        (ingredient) => ingredient.ingredient && ingredients.includes(ingredient.ingredient.name)
      ).length;
      const bMatchCount = b.recipy_ingredients.filter(
        (ingredient) => ingredient.ingredient && ingredients.includes(ingredient.ingredient.name)
      ).length;
      return bMatchCount - aMatchCount;
    });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error searching recipes by ingredients:', error);
    throw error;
  }
}
);


module.exports = recipyRouter