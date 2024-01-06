require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const recipyRouter = require('./controllers/recipies')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('dotenv').config()
const { connectToDatabase } = require('./utils/db')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

const testConnection = async () => {
  await connectToDatabase()
}
testConnection()

app.use('/api/recipies', recipyRouter)
app.use('/api/users', userRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app