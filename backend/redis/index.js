const redis = require('redis')
const { REDIS_URL } = require('../utils/config')


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


module.exports = redisClient;