const {
    checkAndCreateCategories,
    createRecipyCategory,
    findSingleRecipyCategory,
    destroyRecipyCategories,
} = require('../services/categoryService')
const {
    checkAndCreateIngredients,
    createRecipyIngredient,
    findAllIngredients,
    getAllIngredients,
    findRecipiesAccordingToIngredients,
    findRecipyIngredients,
    findSingleRecipyIngredient,
    updateRecipyIngredient,
    destroySingleIngredient
} = require('../services/ingredientService')
const { 
    defineWhereClause, 
    findAllRecipies, 
    createNewRecipy,
    findFullSingleRecipyById,
    findSingleRecipyById,
    deleteSingleRecipy,
    updateExistingRecipy,
} = require('../services/recipyService');

const getRecipies = async (req, res) => {
    try {
        let whereClause = defineWhereClause(req, res);
        let orderClause = [];
        let length = req.query.length || 0;
    
        if (req.query.sort) {
          orderClause.push([req.query.sort, req.query.order || 'DESC']);
        } else {
          orderClause.push(['created_at', 'DESC']);
        }
        
        const foundRecipes = await findAllRecipies(whereClause, orderClause, length);
        const recipeIds = foundRecipes.map(recipe => recipe.id);
        whereClause = { id: recipeIds };
        const recipes = await findAllRecipies(whereClause, orderClause);
        
        return res.status(200).json(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).end();
      }
}

const getFavorites = async (req, res) => {
    try {
        let orderClause = [];
        let whereClause = defineWhereClause(req, res);
        let length = req.query.length || 0;
    
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

        const foundRecipes = await findAllRecipies(whereClause, orderClause, length);
        const recipeIds = foundRecipes.map(recipe => recipe.id);
        whereClause = { id: recipeIds };
        const recipes = await findAllRecipies(whereClause, orderClause);
    
        return res.status(200).json(recipes);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
        return res.status(500).end();
      }
}

const getSubscribed = async (req, res) => {
    try {
        let whereClause = defineWhereClause(req, res);
        let orderClause = [];
        let length = req.query.length || 0;
    
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

        const foundRecipes = await findAllRecipies(whereClause, orderClause, length);
        const recipeIds = foundRecipes.map(recipe => recipe.id);
        whereClause = { id: recipeIds };
        const recipes = await findAllRecipies(whereClause, orderClause);
    
        return res.status(200).json(recipes);
      } catch (error) {
        console.error('Error fetching subscribed users recipes:', error);
        return res.status(500).end();
      }
}

const addRecipy = async (req, res) => {
    try {
        const { ingredients, categories } = req.body;

        const recipe = await createNewRecipy(req, res);
    
        for (const ingredientData of ingredients) {
          const { name, amount, unit } = ingredientData;
          let ingredient = await checkAndCreateIngredients(name);
          let recipeIngredient = await createRecipyIngredient(ingredient.id, recipe.id, amount, unit);  
        }
    
        for (const categoryData of categories) {
          const { name } = categoryData;
          let category = await checkAndCreateCategories(name);
          let recipeCategory = await createRecipyCategory(recipe.id, category.id);
        }

        const returnRecipy = await findFullSingleRecipyById(recipe.id);
    
        return res.status(201).json(returnRecipy);
      } catch (error) {
        console.error('Error creating recipe:', error);
        return res.status(500).end();
      }
}

const deleteRecipy = async (req, res) => {
    try {
        const { id } = req.params;

        const recipe = await findSingleRecipyById(id);
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
        }

        if (recipe.userId !== req.session.userId || req.session.admin) {
          return res.status(403).json({ error: 'Unauthorized' });
        }

        const deletion = await deleteSingleRecipy(req, res);
    
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting recipe:', error);
        return res.status(500).end();
      }
}

const updateRecipy = async (req, res) => {
    try {
        const { id } = req.params;
        const { ingredients, categories } = req.body;
    
        const recipe = await findSingleRecipyById(id);
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
        
        const update = await updateExistingRecipy(req, res);
        let recipeIngredients = await findRecipyIngredients(id);
    
        for (const singleIngredient of recipeIngredients) {
          const success = await destroySingleIngredient(singleIngredient.recipyId, singleIngredient.ingredientId);
        }
    
        for (const ingredientData of ingredients) {
          const { name, amount, unit } = ingredientData;

          let ingredient = await checkAndCreateIngredients(name);
          let recipeIngredient = await findSingleRecipyIngredient(recipe.id, ingredient.id);
    
          if (!recipeIngredient) {
            recipeIngredient = await createRecipyIngredient(ingredient.id, recipe.id, amount, unit);
            
          } else {
            recipeIngredient = await updateRecipyIngredient(ingredient.id, recipe.id, amount, unit);
          }
        }
    
        const success = destroyRecipyCategories(recipe.id);       
    
        for (const categoryData of categories) {
          const { name } = categoryData;

          let category = await checkAndCreateCategories(name);
          let recipeCategory = await findSingleRecipyCategory(recipe.id, category.id);
    
          if (!recipeCategory) {
            recipeCategory = await createRecipyCategory(recipe.id, category.id);
          }
        }

        const returnRecipy = await findFullSingleRecipyById(recipe.id);
    
        return res.status(200).json(returnRecipy);
        
      } catch (error) {
        console.error('Error updating recipe:', error);
        return res.status(500).end();
      }
}

const findRecipy = async (req, res) => {
    try {
        const { ingredients } = req.body;

        const foundIngredients = await findAllIngredients(req, res);
        const ingredientIds = foundIngredients.map(ingredient => ingredient.id);
        const recipeIds = await findRecipiesAccordingToIngredients(ingredientIds);
        const foundRecipeIds = recipeIds.map(recipe => recipe.recipyId);
        const whereClause = { id: foundRecipeIds };
        let orderClause = [];
        const recipes = await findAllRecipies(whereClause, orderClause);
    
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

const getUsersRecipies = async (req, res) => {
    try {
        const whereClause = { userId: req.session.userId };
        let orderClause = [];
        let length = 0
        let limit = 999
        const recipes = await findAllRecipies(whereClause, orderClause, length, limit);
    
        return res.status(200).json(recipes);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
        return res.status(500).end();
      }
}

const getSingleRecipy = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await findFullSingleRecipyById(id);
    
        return res.status(200).json(recipe);
      } catch (error) {
        console.error('Error fetching single recipe:', error);
        return res.status(500).end();
      }
}

const getIngredients = async (req, res) => {
    try {
        const ingredients = await getAllIngredients(req, res);
    
        return res.status(200).json(ingredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        return res.status(500).end();
      }
}

module.exports = {
    getRecipies,
    getFavorites,
    getSubscribed,
    addRecipy,
    deleteRecipy,
    updateRecipy,
    findRecipy,
    getUsersRecipies,
    getSingleRecipy,
    getIngredients
}