const db = require('../models/database')

module.exports = {
  async getAllCharacters(req, res) {
    const characters = await db.character.findAll()
    res.status(200).json(characters)
  }
}
