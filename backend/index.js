const app = require('./app') 
const config = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const PORT = config.PORT || 3001

const startServer = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()