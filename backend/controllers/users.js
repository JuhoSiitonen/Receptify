const userRouter = require("express").Router();
const { User } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.post("/", async (request, response) => {
    try {
      const user = request.body;
      const newUser = await User.create(user);
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
})

userRouter.get("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  return response.status(200).json(user);
})

userRouter.get("/session", async (request, response) => {
  if (!request.session.user) {
    return response.status(401).json({ error: 'Not logged in' });
  }
  return response.status(200).json(request.session.user);
})

userRouter.post("/logout", async (request, response) => {
  request.session.destroy();
  return response.status(204).end();
})

module.exports = userRouter;