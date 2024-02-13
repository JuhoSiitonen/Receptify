const userRouter = require("express").Router();
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.get("/userinfo/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const user = await User.findByPk(id);
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
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

userRouter.post("/subscriptions/:id", async (request, response) => {
    try {
      const userId = request.session.userId;
      const { id } = request.params;
      console.log('userId:', userId)
      console.log('id:', id)
      const friend = await User.findByPk(id);
      const subscribed = await Subscription.findOne({ where: { subscriberId: userId, publisherId: id } });
      if (!userId || !friend) {
        return response.status(404).json({ error: 'User not found' });
      }
      if (subscribed) {
        return response.status(400).json({ error: 'Already subscribed' });
      }
      await Subscription.create({ 
        subscriberId: userId,
        publisherId: id,
      });
      return response.status(201).json({ message: 'Subscription added' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.delete("/subscriptions/:id", async (request, response) => {
  try {
    const userId = request.session.userId;
    const friendId = request.params.id;
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);
    if (!user || !friend) {
      return response.status(404).json({ error: 'User not found' });
    }
    await Subscription.destroy({ where: { user_id_1: userId, user_id_2: friendId } });
    return response.status(204).end();
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
  console.log('recipes:', recipes)
  return response.status(200).json(recipes);
})

module.exports = userRouter;