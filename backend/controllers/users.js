const userRouter = require("express").Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../utils/middleware");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");

userRouter.get("/", sessionChecker, async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.get("/userinfo/:id", sessionChecker, async (request, response) => {
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
      const { username, password } = request.body;
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = {
        username,
        password: passwordHash,
        admin: false,
        visible: true,
      }
      const newUser = await User.create(user, {
        returning: ['id', 'username']} );
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.post("/subscriptions/:id", sessionChecker, async (request, response) => {
    try {
      const { id } = request.params;
      const friend = await User.findByPk(id);
      if (!friend) {
        return response.status(404).json({ error: 'User not found' });
      }
      let subscriptions = JSON.parse(request.session.subscriptions);
      if (subscriptions.some(s => Number(s.id) === Number(id))) {
        return response.status(404).json({ error: 'Already subscribed' });
      }
      subscriptions.push({ id: friend.id, username: friend.username })
      request.session.subscriptions = JSON.stringify(subscriptions);
      await Subscription.create({ 
        subscriberId: request.session.userId,
        publisherId: id,
      });
      return response.status(201).json({ id: friend.id, username: friend.username });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.delete("/subscriptions/:id", sessionChecker, async (request, response) => {
  try {
    const friendId = request.params.id;
    const friend = await User.findByPk(friendId);
    if (!friend) {
      return response.status(404).json({ error: 'User not found' });
    }
    let sunscriptions = JSON.parse(request.session.subscriptions);
    if (!sunscriptions.some(s => Number(s.id) === Number(friendId))) {
      return response.status(404).json({ error: 'Not subscribed' });
    }
    const newSubscriptions = sunscriptions.filter(s => Number(s.id) !== Number(friendId));
    request.session.subscriptions = JSON.stringify(newSubscriptions);
    await Subscription.destroy({ where: { subscriberId: request.session.userId, publisherId: friendId } });
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.post("/favorites/:id", sessionChecker, async (request, response) => {
  try {
    const { id } = request.params;
    let favorites = JSON.parse(request.session.userFavorites);
    const recipe = await Recipy.findByPk(id);
    if (!recipe) {
      return response.status(404).json({ error: 'Recipe not found' });
    }
    if (favorites.some(f => f.id === id)) {
      return response.status(400).json({ error: 'Recipe already in favorites' });
    }
    await Favorite.create({
      userId: request.session.userId,
      recipyId: id,
    });
    favorites.push({ id: recipe.id, title: recipe.title });
    request.session.userFavorites = JSON.stringify(favorites);
    return response.status(201).json({ id: recipe.id, title: recipe.title});
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.delete("/favorites/:id", sessionChecker, async (request, response) => {
  try {
    const { id } = request.params;
    let favorites = JSON.parse(request.session.userFavorites);
    if (!favorites.filter(f => f.id === id)) {
      return response.status(404).json({ error: 'Recipe is not in favorites' });
    }
    const newFavorites = favorites.filter(f => Number(f.id) !== Number(id));
    request.session.userFavorites = JSON.stringify(newFavorites);
    await Favorite.destroy({ where: { userId: request.session.userId, recipyId: id } });
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
        rated: JSON.parse(sess.rated),
        shoppinglist: JSON.parse(sess.shoppinglist),
        email: sess.email,
        about: sess.about,
      }
      console.log('currentUser:', currentUser)      
      return response.status(200).json(currentUser);
    }
    return response.status(200).json({});
  }
  catch (error) {
    console.error('Error in /session endpoint:', error);
    return response.status(500).json({ error: error.message });
  }
})

userRouter.post("/logout", sessionChecker, async (request, response) => {
  request.session.destroy();
  return response.status(204).end();
})

userRouter.get("/:id/view", sessionChecker, async (request, response) => {
  const { id } = request.params;
  const recipes = await Recipy.findAll({ where: { userId: id},
    include: [
      { model: User,
        as: 'owner',
        attributes: [ "id", "username"] },
      { model: RecipyIngredient, include: [Ingredient] },
      { model: RecipyCategory, include: [Category] },
    ],
  });
  return response.status(200).json(recipes);
})

userRouter.post("/shoppinglist", sessionChecker, async (request, response) => {
  try {
    const items = request.body;
    console.log('items:', items)
    let shoppinglist = JSON.parse(request.session.shoppinglist);
    items.map(i => shoppinglist.push(i));
    request.session.shoppinglist = JSON.stringify(shoppinglist);
    return response.status(201).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.delete("/shoppinglist/:id", sessionChecker, async (request, response) => {
  try {
    const { id } = request.params;
    let shoppinglist = JSON.parse(request.session.shoppinglist);
    if (!shoppinglist.filter(i => i.id === id)) {
      return response.status(404).json({ error: 'Item not found in shoppinglist' });
    }
    const newShoppinglist = shoppinglist.filter(i => Number(i.id) !== Number(id));
    request.session.shoppinglist = JSON.stringify(newShoppinglist);
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.post("/shoppinglist/email", sessionChecker, async (request, response) => {
  try {
    const { items, email } = request.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
          user: EMAIL,
          pass: EMAIL_PASSWORD
      }
  });

  let recipies = items.map(i => i.recipy).join(', ');
  recipies = recipies.split(', ').filter((item, index, array) => array.indexOf(item) === index).join(', ');
  const ingredients = items.map(i => `${i.ingredient} - ${i.amount} ${i.unit}`).join('\n');
  const emailText = `Your shopping list for the following recipies: ${recipies}\n\n${ingredients}`;

  const mailOptions = {
      from: EMAIL,
      to: email, 
      subject: 'Your Shopping List', 
      text: emailText
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent: ' + info.response);
          res.send('Email sent successfully');
      }
  });

    return response.status(200).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.put("/about", sessionChecker, async (request, response) => {
  try {
    const { about } = request.body;
    request.session.about = about;

    const user = await User.findByPk(request.session.userId);
    user.about = about;
    await user.save();

    return response.status(201).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

userRouter.put("/email", sessionChecker, async (request, response) => {
  try {
    const { email } = request.body;
    request.session.email = true;

    const user = await User.findByPk(request.session.userId);
    user.email = email;
    await user.save();

    return response.status(201).end();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})


module.exports = userRouter;