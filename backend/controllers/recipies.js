const recipyRouter = require("express").Router();

const recipies = [
  {
      id: 1,
      title: 'Test recipe',
      description: 'Test description',
      ingredients: ['Test ingredients', 'Test amount'],
      instructions: 'Test instructions',
      category: ['Test category', 'Test subcategory'],
      date: '2021-01-01T00:00:00.000Z',
      user: 'Test user'
  },
  {
      id: 2,
      title: 'Test recipe 2',
      description: 'Test description 2',
      ingredients: ['Test ingredients 2', 'Test amount 2'],
      instructions: 'Test instructions 2',
      category: ['Test category 2', 'Test subcategory 2'],
      date: '2021-01-02T00:00:00.000Z',
      user: 'Test user 2'
  }
]

recipyRouter.get("/", (request, response) => {
  return response.json(recipies);
})

recipyRouter.post("/", (request, response) => {
  const recipy = request.body;
  return response.json(recipy);
})

module.exports = recipyRouter;