#!/usr/bin/env node

require('dotenv').config()
const db = require('../models/database.js')
const bcrypt = require('bcrypt')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const figlet = require('figlet')
const log = console.log

// Create a new user for the portal
const createUser = async () => {
  const username = readlineSync.question(chalk.cyan('Username: '))
  const email = readlineSync.question(chalk.cyan('Email: '))
  const password = readlineSync.question(chalk.cyan('Password: '), {
    hideEchoBack: true
  })

  log(chalk.bgYellow.black('==== Creating user ===='))
  const passHash = bcrypt.hashSync(password, 10)
  try {
    var result = await db.User.create({
      username: username,
      email: email,
      password: passHash
    })
  } catch (err) {
    log(err)
    process.exit(-1)
  }

  log(result.dataValues)
  log(chalk.green('Created user!'))

  log(chalk.green('Finished creating user pages!'))

  process.exit(0)
}

// Delete a user and all their config options
const deleteUser = async () => {
  const users = await db.User.findAll()
  log(chalk.magenta('|-------------------------'))
  log(chalk.magenta('|- User id || User name -|'))
  log(chalk.magenta('--------------------------'))

  for (let user of users) {
    log(chalk.magenta('| ') + user.id + chalk.magenta(' \t   || ') + user.username)
  }
  log(chalk.magenta('--------------------------'))
  const userId = readlineSync.question(chalk.cyan('user_id to delete: '))

  try {
    await db.User.destroy({
      where: {
        id: userId
      }
    })

    await db.UserPage.destroy({
      where: {
        user_id: userId
      }
    })

    log(chalk.green('Deleted user!'))
    process.exit(0)
  } catch (err) {
    log(err)
    process.exit(-3)
  }
}

// Change the users password
const changeUserPassword = async () => {
  const email = readlineSync.question(chalk.yellow('Email: '))
  const password = readlineSync.question(chalk.yellow('Password: '), {
    hideEchoBack: true
  })

  try {
    const user = await db.User.findOne({ where: { email: email } })
    await user.updateAttributes({
      password: bcrypt.hashSync(password, 10)
    })
  } catch (err) {
    log(chalk.red(err))
    process.exit(-3)
  }

  log(chalk.green("Updated user's password!"))
  process.exit(0)
}

// --------------------------------------------------------------------- //
// Main section                                                          //
// --------------------------------------------------------------------- //
log(figlet.textSync('User Management'))

log(chalk.underline.blue.bgBlack.bold('Choose an option:'))
log(chalk.yellow.bgBlack.bold('[1]: ') + 'Create user')
log(chalk.yellow.bgBlack.bold('[2]: ') + 'Delete user')
log(chalk.yellow.bgBlack.bold('[3]: ') + 'Change user password')

const selection = readlineSync.question('Selection:')

switch (selection) {
  case '1':
    createUser()
    break
  case '2':
    deleteUser()
    break
  case '3':
    changeUserPassword()
    break
  default:
    log(chalk.red('Invalid selection'))
}
