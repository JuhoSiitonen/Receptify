const Sequelize = require('sequelize')
const { DATABASE_URL, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

let db_connect = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}/${POSTGRES_DB}`

if (process.env.NODE_ENV === 'test') {
  db_connect = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}/${POSTGRES_DB}`
}

const sequelize = new Sequelize(db_connect)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }