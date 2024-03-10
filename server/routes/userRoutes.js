const express = require('express')
const { subscribe } = require('../controllers/userController')
const router = express.Router()

router.post('/subscribe', subscribe)


module.exports = router   