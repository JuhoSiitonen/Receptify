require('dotenv').config()


module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_SESSION_KEY: process.env.REDIS_SESSION_KEY,
  }