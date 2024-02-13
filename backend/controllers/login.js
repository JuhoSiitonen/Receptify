const loginRouter = require('express').Router();
const { User } = require('../models');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username } }, );
    if (user && user.password === password) {
        const sess = request.session;
        sess.userId = user.id;
        sess.username = user.username;
        const returnUser = { id: user.id, username: user.username, admin: user.admin };
        return response.status(200).json(returnUser);
    }
    return response.status(401).json({ error: 'invalid username or password' });
    });

module.exports = loginRouter;