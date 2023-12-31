const recipyRouter = require("express").Router();

recipyRouter.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
})

module.exports = recipyRouter;