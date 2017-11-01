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
    const { type, characters, url, title } = req.body
    await db.resource.create({
      type: type,
      char1: characters[0],
      char2: characters[1],
      char3: characters[2],
      char4: characters[3],
      url: url,
      title: title
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
    const matches = await db.resource.findAll({ where: { type: 'Match' } })
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
    const videos = await db.resource.findAll({ where: { type: 'Video' } })
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
    const tutorials = await db.resource.findAll({ where: { type: 'Tutorial' } })
    res.status(200).json(tutorials)
  }
}
