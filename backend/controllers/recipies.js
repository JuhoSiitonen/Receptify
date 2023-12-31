const recipyRouter = require("express").Router();

const recipies = [
  {
      id: 1,
      title: 'Test recipe',
      description: 'Test description',
      ingredients: 'Test ingredients',
      instructions: 'Test instructions'
  }
]

recipyRouter.get("/", (request, response) => {
  return response.json(recipies);
})

module.exports = recipyRouter;