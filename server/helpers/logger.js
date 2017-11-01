const winston = require('winston')

function timestamp() {
  const date = new Date()
  return (
    date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }) +
    ' ' +
    date.toLocaleTimeString()
  )
  // return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}
//Set up the winston transports we will be using for logging
let winstonTransports = []
winstonTransports.push(
  new winston.transports.File({
    name: 'tailable-log',
    filename: 'logs/portalTail.log',
    colorize: true,
    level: 'silly',
    json: false,
    prettyPrint: true,
    depth: 3,
    timestamp: timestamp,
    tailable: true,
    maxsize: 10 * 1024 * 1024,
    maxFiles: 1
  })
)

winstonTransports.push(
  new winston.transports.File({
    name: 'emm-log',
    filename: 'logs/portal.log',
    maxFiles: 5,
    maxsize: 5 * 1024 * 1024,
    level: 'silly',
    json: false,
    timestamp: timestamp,
    prettyPrint: true,
    depth: 3,
    tailable: true
  })
)

//Create the new winston logger using the transports declared previously
const logger = new winston.Logger({
  transports: winstonTransports
})

logger.stream = {
  write: function(message) {
    logger.verbose(message)
  }
}

logger.verbose('Winston Logger has been initialized')

module.exports = logger
