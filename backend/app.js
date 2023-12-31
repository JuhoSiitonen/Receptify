const config = require('./utils/config')
const app = express()
const cors = require('cors')
const recipyRouter = require('./controllers/recipies')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/recipies', recipyRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app