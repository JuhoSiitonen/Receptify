const userRouter = require("express").Router();
const { User } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.post("/", async (request, response) => {
    const user = request.body;
    const newUser = await User.create(user);
    return response.status(201).json(newUser);;
})

userRouter.get("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  return response.json(user);
})

module.exports = userRouter;