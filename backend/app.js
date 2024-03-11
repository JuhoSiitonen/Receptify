require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const session = require('express-session');
const { redisConf } = require('./redis')

const recipyRouter = require('./controllers/recipies')
const ratingRouter = require('./controllers/rating')
const commentRouter = require('./controllers/comments')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const healthRouter = require('./controllers/health')
const ingredientRouter = require('./controllers/ingredients')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('dotenv').config()

app.enable('trust proxy');

app.use(cors({
  credentials: true,
  origin: config.FRONTEND_URL,
}))

app.use(express.static('build'))
app.use(express.json()) 
app.use(middleware.requestLogger)

app.use(session(redisConf));

app.use('/api/recipies', recipyRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/comments', commentRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/ingredients', ingredientRouter)
app.use('/api/health', healthRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app