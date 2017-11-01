const db = require('../Models/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../Helpers/Logger')
const owasp = require('owasp-password-strength-test')

module.exports = {
  // Check if a valid username and password is provided and return a JWT if so
  async login(req, res) {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user) {
      logger.log('verbose', 'Attempting to login user: ', user.email)
      // Check if the account is locked
      logger.log('debug', "Checking if user's account is locked")
      if (user.locked) {
        logger.log('error', 'User tried to log into locked account')
        return res.status(401).json({
          msg: 'This account is locked, please contact the system administrator for assistance.'
        })
      }
      // Verify the password
      logger.log('debug', 'Verifying password...')
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Password correct, create JWT token
        logger.log('verbose', 'User is logged in - ', user.email)
        const token = jwt.sign(user.dataValues, process.env.APP_KEY, {
          expiresIn: '12h'
        })

        // Update the last logged in field for the user
        await user.updateAttributes({
          last_login: db.sequelize.fn('NOW'),
          login_attempts: 0
        })
        return res.json({
          token: token
        })
      } else {
        // Invalid password given, add the bad login attempt to the database
        logger.log('warn', 'Invalid password attempt')
        await user.increment('login_attempts')
        if (user.login_attempts >= 5) {
          await user.updateAttributes({
            locked: 1
          })
          logger.log('error', 'Account now locked from too many login attempts')
          return res.status(401).json({
            msg: 'Account is locked due to too many login attempts, please contact system administrator for assistance.'
          })
        } else {
          return res.status(401).json({
            msg: 'Invalid email and/or password. Upon 5 incorrect logins the account will be locked.'
          })
        }
      }
    } else {
      logger.log('error', 'Login attempt unsuccessful', req.body.email)
      return res.status(401).json({
        msg: 'Invalid email and/or password. Upon 5 incorrect logins the account will be locked.'
      })
    }
  },

  // Simple verification of the token sent in the auth header
  // Also retrieves information about the user that the portal uses for rendering
  async verifyAuth(req, res) {
    const user = res.locals.user
    logger.log('verbose', 'Verifying authentication token')

    res.status(200).json({
      email: user.email
    })
  },

  // Attempt to change the user's password
  async changePassword(req, res) {
    const user = res.locals.user
    const currentPass = req.body.current

    const newPass = req.body.new

    if (bcrypt.compareSync(currentPass, user.password)) {
      // Check for password minimums
      const passTestResult = owasp.test(newPass)
      if (!passTestResult.strong) {
        logger.log('error', 'Invalid new password entered')
        return res.status(400).json({
          msg: 'Invalid new password',
          errors: passTestResult.errors
        })
      }

      // If the user provided the correct password, and their new password meets the
      // minimum requirements, update their user record with the new password
      const userRecord = await db.User.findOne({
        where: { email: user.email }
      })
      await userRecord.updateAttributes({
        password: bcrypt.hashSync(newPass, 10)
      })
      logger.log('debug', 'Password successfully changed for: ', user.id)
      return res.status(200).json({
        success: true
      })
    } else {
      logger.log('debug', 'Incorrect password given during password change')
      return res.status(400).json({
        success: false,
        msg: 'Incorrect password'
      })
    }
  }
}
