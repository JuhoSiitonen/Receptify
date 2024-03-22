require('dotenv').config()
const logger = require('./logger')

const sessionChecker = (request, response, next) => {
    if (process.env.NODE_ENV === 'test') {
      userId = request.body.userId;
      request.session.userId = userId;
      next();
    }
    if (request.session.userId) {
      next();
    } else {
      response.status(401).json({ error: 'Unauthorized' });
    }
  }

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    sessionChecker
  }