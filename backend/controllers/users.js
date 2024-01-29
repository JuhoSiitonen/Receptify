const userRouter = require("express").Router();
const { User } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.get("/me", async (request, response) => {
  const user = await User.findByPk(request.user.id);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  return response.status(200).json(user);
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

module.exports = userRouter;