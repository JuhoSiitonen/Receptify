const userRouter = require("express").Router();
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.post("/", async (request, response) => {
    try {
      const user = request.body;
      const newUser = await User.create(user, {
        returning: ['id', 'username']} );
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.get("/session", async (request, response) => {
  try {
    const sess =  request.session;
    if (sess.userId) {
      currentUser = await User.findByPk( sess.userId, { attributes: { exclude: ['password'] } })      
      return response.status(200).json(currentUser);
    }
    return response.status(200);
  }
  catch (error) {
    console.error('Error in /session endpoint:', error);
    return response.status(500).json({ error: error.message });
  }
})

userRouter.post("/logout", async (request, response) => {
  request.session.destroy();
  return response.status(204).end();
})

userRouter.get("/:id/view", async (request, response) => {
  const { id } = request.params;
  const recipes = await Recipy.findAll({ where: { userId: id},
    include: [
      { model: User,
        attributes: [ "id", "username"] },
      { model: RecipyIngredient, include: [Ingredient] },
      { model: RecipyCategory, include: [Category] },
    ],
  });
  return response.status(200).json(recipes);
})

module.exports = userRouter;