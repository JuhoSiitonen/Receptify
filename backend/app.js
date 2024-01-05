require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const recipyRouter = require('./controllers/recipies')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { Sequelize } = require('sequelize')
require('dotenv').config()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

const sequelize = new Sequelize(process.env.DATABASE_URL)

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

app.use('/api/recipies', recipyRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app