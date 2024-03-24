const { connectToDatabase, runMigrations } = require('./db');

(async () => {
  try {
    await connectToDatabase();
    await runMigrations();
    console.log('Database migrations successfully executed.');
  } catch (error) {
    console.error('Error executing migrations:', error);
    process.exit(1);
  }
})();