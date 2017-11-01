// We setup the database connections and models according to whether the server is running
// in the internal environment or in the full brain environment
const Sequelize = require('sequelize')
const logger = require('../helpers/logger')

// DB object that can be referenced everywhere else in the app
const db = {}

db.Sequelize = Sequelize

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: msg => logger.debug(msg),
  define: {
    timestamps: false,
    underscored: true
  }
})

db.sequelize = sequelize

db.user = require('./user')(sequelize, Sequelize)
db.character = require('./character')(sequelize, Sequelize)
db.resource = require('./resource')(sequelize, Sequelize)
db.contributionKey = require('./contributionKey')(sequelize, Sequelize)

module.exports = db
