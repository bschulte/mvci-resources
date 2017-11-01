const db = require('../models/database')
const logger = require('../helpers/logger')

module.exports = {
  /**
   * Submits a new resource to insert into the DB
   *
   * @param {any} req
   * @param {any} res
   */
  async submitResource(req, res) {
    logger.log('verbose', 'Submitting new resource')
    logger.log('debug', 'body:', req.body)
    const { type, characters, url, title, contributionKey } = req.body

    // Try to get the contribution key to see if we have an authenticated user adding content
    const key = await db.contributionKey.findOne({ where: { key: contributionKey } })
    let userId, enabled
    if (key) {
      userId = key.id
      enabled = 1
      logger.log('debug', 'User is authenticated:', key.user)
    } else {
      enabled = 0
      logger.log('debug', 'User is not authenticated')
    }

    await db.resource.create({
      type: type,
      char1: characters[0],
      char2: characters[1],
      char3: characters[2],
      char4: characters[3],
      url: url,
      title: title,
      contribution_key_id: userId,
      enabled: enabled
    })

    logger.log('verbose', 'Finished inserting new resource')
    res.sendStatus(200)
  },

  /**
   * Get all the matches in the database
   *
   * @param {any} req
   * @param {any} res
   */
  async getAllMatches(req, res) {
    logger.log('verbose', 'Getting all matches')
    const matches = await db.resource.findAll({ where: { type: 'Match', enabled: 1 } })
    res.status(200).json(matches)
  },

  /**
   * Get all the videos in the database
   *
   * @param {any} req
   * @param {any} res
   */
  async getAllVideos(req, res) {
    logger.log('verbose', 'Getting all videos')
    const videos = await db.resource.findAll({ where: { type: 'Video', enabled: 1 } })
    res.status(200).json(videos)
  },

  /**
   * Get all the tutorials in the database
   *
   * @param {any} req
   * @param {any} res
   */
  async getAllTutorials(req, res) {
    logger.log('verbose', 'Getting all tutorials')
    const tutorials = await db.resource.findAll({ where: { type: 'Tutorial', enabled: 1 } })
    res.status(200).json(tutorials)
  }
}
