const userRouter = require("express").Router();
const { User } = require("../models");

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

/*
userRouter.get("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  return response.status(200).json(user);
})
*/

userRouter.get("/session", async (request, response) => {
  console.log("mitä vittua saatana")
  try {
    const sess =  request.session;
    console.log( "session username: ", sess.username);
    if (sess.userId) {
      currentUser = await User.findByPk( sess.userId, { attributes: { exclude: ['password'] } })
      console.log(sess.username)
      
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

module.exports = userRouter;