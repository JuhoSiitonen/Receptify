const loginRouter = require('express').Router();
const { User, Recipy, Rating } = require('../models');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username }, 
        include: [
            { model: User, 
              as: 'subscriptions', 
              attributes: ["id", "username"],
              through: {
                attributes: []
              }, },
            { model: Recipy, 
              as: 'userFavorites', 
              attributes: ["id", "title"],
              through: {
                attributes: []
              }, },
          ],
        }
      );
    const rated = await Rating.findAll({ 
      where: { userId: user.id },
      attributes: ["recipyId", "rating"],
    });

    if (user && user.password === password) {
        const sess = request.session;
        sess.userId = user.id;
        sess.username = user.username;
        sess.admin = user.admin;
        sess.subscriptions = JSON.stringify(user.subscriptions);
        sess.userFavorites = JSON.stringify(user.userFavorites);
        sess.rated = JSON.stringify(rated);
        const returnUser = { 
            id: user.id, 
            username: user.username, 
            admin: user.admin,
            subscriptions: user.subscriptions,
            userFavorites: user.userFavorites,
            rated: rated,
         };
        return response.status(200).json(returnUser);
    }
    return response.status(401).json({ error: 'invalid username or password' });
    });

module.exports = loginRouter;