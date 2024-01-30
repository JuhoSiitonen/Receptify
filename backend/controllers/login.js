const loginRouter = require('express').Router();
const { User } = require('../models');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
        request.session.user = { id: user.id, username: user.username};
        console.log(request.session.user);
        return response.status(200).json(user);
    }
    return response.status(401).json({ error: 'invalid username or password' });
    });

module.exports = loginRouter;