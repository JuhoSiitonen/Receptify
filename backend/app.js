require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const session = require('express-session')
const { redisConf } = require('./redis')

const recipyRouter = require('./routes/recipies')
const ratingRouter = require('./routes/rating')
const commentRouter = require('./routes/comments')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const testingRouter = require('./routes/testing')
const healthRouter = require('./routes/health')

const middleware = require('./utils/middleware')
require('dotenv').config()

app.enable('trust proxy')
app.use(cors({
  credentials: true,
  origin: config.FRONTEND_URL
}))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(session(redisConf))

app.use('/api/recipies', recipyRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/comments', commentRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/health', healthRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
