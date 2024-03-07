require('dotenv').config()


module.exports = {
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_SESSION_KEY: process.env.REDIS_SESSION_KEY,
  }