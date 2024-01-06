const userRouter = require("express").Router();
const { User } = require("../models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  return response.json(users);
})

userRouter.post("/", async (request, response) => {
    const user = request.body;
    const newUser = await User.create(user);
    return response.json(newUser);
})

module.exports = userRouter;