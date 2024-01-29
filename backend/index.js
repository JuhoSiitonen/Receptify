const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { connectToDatabase } = require('./utils/db')

const server = http.createServer(app)

const PORT = config.PORT || 3001

const startServer = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()