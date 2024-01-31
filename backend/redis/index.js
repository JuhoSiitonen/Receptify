const redis = require('redis')
const { REDIS_URL } = require('../utils/config')
const RedisStore = require('connect-redis').default;
const { REDIS_SESSION_KEY } = require('../utils/config')

const redisClient = redis.createClient({
    url: REDIS_URL,
});
  
redisClient.on('ready', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

(async () => { await redisClient.connect(); })();

const redisConf = {
    store: new RedisStore({ client: redisClient }),
    secret: REDIS_SESSION_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      //sameSite: 'lax',
      secure: false,
      httpOnly: false,
      //path: '/',
    },
}

module.exports = { redisClient, redisConf }