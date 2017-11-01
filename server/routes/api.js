// Any routes that are going to exposed to REST API end users as well as the EMM portal
const express = require('express')
const router = express.Router()

const characterController = require('../controllers/characterController')
const resourceController = require('../controllers/resourceController')

router.get('/characters', characterController.getAllCharacters)
router.get('/matches', resourceController.getAllMatches)
router.get('/videos', resourceController.getAllVideos)
router.get('/tutorials', resourceController.getAllTutorials)
router.post('/resource', resourceController.submitResource)

module.exports = router
