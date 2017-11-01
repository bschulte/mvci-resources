const jwt = require('jsonwebtoken')
const logger = require('../helpers/logger')

module.exports = {
  // Simply verify that the given token is a valid one
  async verifyToken(req, res, next) {
    if (res.locals.user) {
      logger.debug('Found user object, not checking token')
      return next()
    }

    logger.log('debug', 'Verifying token for path:', req.path)
    var authHeader = req.headers.authorization

    // If the token was not provided in the headers, check the query string or request
    // body for the token
    if (!authHeader) {
      authHeader = req.query.token || req.body.token
    }

    if (!authHeader) {
      logger.log('warn', 'No auth header provided!')
      return res.sendStatus(401)
    }

    authHeader = authHeader.split(' ')[1]
    let user = null
    try {
      user = jwt.verify(authHeader, process.env.APP_KEY)
    } catch (err) {
      logger.log('error', 'Error verifying JWT', err)
    }

    if (user) {
      logger.log('debug', 'Verified token')
      res.locals.user = user
      return next()
    } else {
      logger.log('verbose', 'Could not verify user', authHeader, req.body)
      return res.sendStatus(401)
    }
  }
}
