const { connectToDatabase } = require('./db');

(async () => {
  try {
    await connectToDatabase()
  } catch (error) {
    process.exit(1)
  }
})()
