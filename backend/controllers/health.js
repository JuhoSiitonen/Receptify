const healthRouter = require('express').Router();

healthRouter.get('/', (_request, response) => {
  response.send('ok');
});

module.exports = healthRouter;