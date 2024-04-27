const redis = require('redis')
const { REDIS_URL } = require('../utils/config')
const RedisStore = require('connect-redis').default
const { REDIS_SESSION_KEY } = require('../utils/config')

const redisConnection = `redis://${REDIS_URL}`

const redisClient = redis.createClient({
  url: redisConnection
})

redisClient.on('ready', () => {
  console.log('Redis client connected')
})

redisClient.on('error', (err) => {
  console.error('Redis client error:', err)
});

(async () => { await redisClient.connect() })()

const redisConf = {
  store: new RedisStore({ client: redisClient }),
  secret: REDIS_SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: false
  }
}

module.exports = { redisClient, redisConf }
