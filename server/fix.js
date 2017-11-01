require('dotenv').config()
const db = require('./models/database')

const fix = async () => {
  const entries = await db.resource.findAll()
  for (let entry of entries) {
    if (entry.char1.includes('undefined')) {
      await entry.updateAttributes({ char1: null, char2: null, char3: null, char4: null })
    } else {
      // Char 1 and 2
      const char1Name = entry.char1.split(',')[0]
      const char2Name = entry.char1.split(',')[1]
      let result = await db.character.findOne({ where: { name: char1Name } })
      const char1Id = result.id

      result = await db.character.findOne({ where: { name: char2Name } })
      const char2Id = result.id

      const char3Name = entry.char2.split(',')[0]
      const char4Name = entry.char2.split(',')[1]
      result = await db.character.findOne({ where: { name: char3Name } })
      const char3Id = result.id

      result = await db.character.findOne({ where: { name: char4Name } })
      const char4Id = result.id

      await entry.updateAttributes({ char1: char1Id, char2: char2Id, char3: char3Id, char4: char4Id })
    }
  }
}

fix()
