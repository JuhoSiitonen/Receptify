const bcrypt = require('bcrypt')
const { User, Recipy, Rating } = require('../models');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, 
        include: [
            { model: User, 
              as: 'subscriptions', 
              attributes: ["id", "username", "email", "about"],
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

    const shoppinglist = [];

    const email = user.email === null 
    ? false 
    : true;

    const about = user.about === null
    ? ''
    : user.about;

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

    if (user && passwordCorrect) {
        const sess = req.session;
        sess.userId = user.id;
        sess.username = user.username;
        sess.admin = user.admin;
        sess.subscriptions = JSON.stringify(user.subscriptions);
        sess.userFavorites = JSON.stringify(user.userFavorites);
        sess.rated = JSON.stringify(rated);
        sess.shoppinglist = JSON.stringify(shoppinglist);
        sess.email = email;
        sess.about = about;
        const returnUser = { 
            id: user.id, 
            username: user.username, 
            admin: user.admin,
            subscriptions: user.subscriptions,
            userFavorites: user.userFavorites,
            rated: rated,
            shoppinglist: shoppinglist,
            email: email,
            about: about,
         };
        return res.status(200).json(returnUser);
    }
    return res.status(401).json({ error: 'invalid username or password' });
}

module.exports = {
    login,
}