const userRouter = require("express").Router();
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");

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
      const friend = await User.findByPk(id);
      if (!userId || !friend) {
        return response.status(404).json({ error: 'User not found' });
      }
      let subscriptions = JSON.parse(request.session.subscriptions);
      if (!subscriptions.some(s => Number(s.id) === Number(id))) {
        return response.status(404).json({ error: 'Not subscribed' });
      }
      subscriptions.push({ id: friend.id, username: friend.username })
      request.session.subscriptions = JSON.stringify(subscriptions);
      await Subscription.create({ 
        subscriberId: userId,
        publisherId: id,
      });
      return response.status(201).json({ id: friend.id, username: friend.username });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.delete("/subscriptions/:id", async (request, response) => {
  try {
    const userId = request.session.userId;
    const friendId = request.params.id;
    const friend = await User.findByPk(friendId);
    if (!userId || !friend) {
      return response.status(404).json({ error: 'User not found' });
    }
    let sunscriptions = JSON.parse(request.session.subscriptions);
    if (!sunscriptions.some(s => Number(s.id) === Number(friendId))) {
      return response.status(404).json({ error: 'Not subscribed' });
    }
    const newSubscriptions = sunscriptions.filter(s => Number(s.id) !== Number(friendId));
    request.session.subscriptions = JSON.stringify(newSubscriptions);
    await Subscription.destroy({ where: { subscriberId: userId, publisherId: friendId } });
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.post("/favorites/:id", async (request, response) => {
  try {
    const userId = request.session.userId;
    const { id } = request.params;
    let favorites = JSON.parse(request.session.userFavorites);
    const recipe = await Recipy.findByPk(id);
    if (!userId || !recipe) {
      return response.status(404).json({ error: 'User or recipe not found' });
    }
    if (favorites.some(f => f.id === id)) {
      return response.status(400).json({ error: 'Recipe already in favorites' });
    }
    await Favorite.create({
      userId,
      recipyId: id,
    });
    favorites.push({ id: recipe.id, title: recipe.title });
    request.session.userFavorites = JSON.stringify(favorites);
    return response.status(201).json({ id: recipe.id, title: recipe.title});
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.delete("/favorites/:id", async (request, response) => {
  try {
    const userId = request.session.userId;
    const { id } = request.params;
    if (!userId) {
      return response.status(404).json({ error: 'User not found' });
    }
    let favorites = JSON.parse(request.session.userFavorites);
    if (!favorites.filter(f => f.id === id)) {
      return response.status(404).json({ error: 'Recipe is not in favorites' });
    }
    const newFavorites = favorites.filter(f => Number(f.id) !== Number(id));
    console.log('favorites:', newFavorites)
    request.session.userFavorites = JSON.stringify(newFavorites);
    await Favorite.destroy({ where: { userId, recipyId: id } });
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.get("/session", async (request, response) => {
  try {
    const sess =  request.session;
    if (sess.userId) {
      const currentUser = {
        id: sess.userId,
        username: sess.username,
        admin: sess.admin,
        subscriptions: JSON.parse(sess.subscriptions),
        userFavorites: JSON.parse(sess.userFavorites),
      }
      console.log('currentUser:', currentUser)      
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