const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");


const getUsers = async (req, res) => {
    const users = await User.findAll();
    return res.json(users);
} 

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
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
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

const subscribeToUser = async (req, res) => {
    try {
        const { id } = req.params;
        const friend = await User.findByPk(id);
        if (!friend) {
          return res.status(404).json({ error: 'User not found' });
        }
        let subscriptions = JSON.parse(req.session.subscriptions);
        if (subscriptions.some(s => Number(s.id) === Number(id))) {
          return res.status(404).json({ error: 'Already subscribed' });
        }
        subscriptions.push({ id: friend.id, username: friend.username })
        req.session.subscriptions = JSON.stringify(subscriptions);
        await Subscription.create({ 
          subscriberId: req.session.userId,
          publisherId: id,
        });
        return res.status(201).json({ id: friend.id, username: friend.username });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const unsubscribeFromUser = async (req, res) => {
    try {
        const friendId = req.params.id;
        const friend = await User.findByPk(friendId);
        if (!friend) {
          return res.status(404).json({ error: 'User not found' });
        }
        let sunscriptions = JSON.parse(req.session.subscriptions);
        if (!sunscriptions.some(s => Number(s.id) === Number(friendId))) {
          return res.status(404).json({ error: 'Not subscribed' });
        }
        const newSubscriptions = sunscriptions.filter(s => Number(s.id) !== Number(friendId));
        req.session.subscriptions = JSON.stringify(newSubscriptions);
        await Subscription.destroy({ where: { subscriberId: req.session.userId, publisherId: friendId } });
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const addAsFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        let favorites = JSON.parse(req.session.userFavorites);
        const recipe = await Recipy.findByPk(id);
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
        if (favorites.some(f => f.id === id)) {
          return res.status(400).json({ error: 'Recipe already in favorites' });
        }
        await Favorite.create({
          userId: req.session.userId,
          recipyId: id,
        });
        favorites.push({ id: recipe.id, title: recipe.title });
        req.session.userFavorites = JSON.stringify(favorites);
        return res.status(201).json({ id: recipe.id, title: recipe.title});
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const removeFromFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        let favorites = JSON.parse(req.session.userFavorites);
        if (!favorites.filter(f => f.id === id)) {
          return res.status(404).json({ error: 'Recipe is not in favorites' });
        }
        const newFavorites = favorites.filter(f => Number(f.id) !== Number(id));
        req.session.userFavorites = JSON.stringify(newFavorites);
        await Favorite.destroy({ where: { userId: req.session.userId, recipyId: id } });
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const getSession = async (req, res) => {
    try {
        const sess =  req.session;
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
          return res.status(200).json(currentUser);
        }
        return res.status(200).json({});
      }
      catch (error) {
        console.error('Error in /session endpoint:', error);
        return res.status(500).json({ error: error.message });
      }
}

const logoutUser = async (req, res) => {
    req.session.destroy();
    return res.status(204).end();
}

const viewUser = async (req, res) => {
    const { id } = req.params;
    const recipes = await Recipy.findAll({ where: { userId: id},
      include: [
        { model: User,
          as: 'owner',
          attributes: [ "id", "username"] },
        { model: RecipyIngredient, include: [Ingredient] },
        { model: RecipyCategory, include: [Category] },
      ],
    });
    return res.status(200).json(recipes);
}

const addToShoppinglist = async (req, res) => {
    try {
        const items = req.body;
        let shoppinglist = JSON.parse(req.session.shoppinglist);
        items.map(i => shoppinglist.push(i));
        req.session.shoppinglist = JSON.stringify(shoppinglist);
        return res.status(201).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const removeFromShoppinglist = async (req, res) => {
    try {
        const { id } = req.params;
        let shoppinglist = JSON.parse(req.session.shoppinglist);
        if (!shoppinglist.filter(i => i.id === id)) {
          return res.status(404).json({ error: 'Item not found in shoppinglist' });
        }
        const newShoppinglist = shoppinglist.filter(i => Number(i.id) !== Number(id));
        req.session.shoppinglist = JSON.stringify(newShoppinglist);
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const sendEmail = async (req, res) => {
    try {
        const { items, email } = req.body;
    
        let emailAddress = email;
    
        if (email === '') {
          const user = await User.findByPk(req.session.userId);
          emailAddress = user.email;
        }
    
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
          to: emailAddress, 
          subject: 'Your Shopping List', 
          text: emailText
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error(error);
              res.status(500).send('Error sending email');
          } else {
              console.log('Email sent: ' + info.response);
          }
      });  
        return res.status(200).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const setAboutInfo = async (req, res) => {
    try {
        const { aboutMe } = req.body;
        req.session.about = aboutMe
    
        const user = await User.findByPk(req.session.userId);
        user.about = aboutMe
        await user.save();
    
        return res.status(201).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

const setEmailAddress = async (req, res) => {
    try {
        const { email } = req.body;
        req.session.email = true;
        
        const user = await User.findByPk(req.session.userId);
        user.email = email;
        await user.save();
    
        return res.status(201).end();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
}

module.exports = {
    getUsers,
    createUser,
    subscribeToUser,
    unsubscribeFromUser,
    getUserInfo,
    addAsFavorite,
    removeFromFavorites,
    getSession,
    logoutUser,
    viewUser,
    addToShoppinglist,
    removeFromShoppinglist,
    sendEmail,
    setAboutInfo,
    setEmailAddress
}