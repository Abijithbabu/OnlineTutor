const express = require('express')
const { subscribe, getCourses } = require('../controllers/userController')
const router = express.Router()

router.post('/subscribe', subscribe)
router.post('/getCourses', getCourses)


module.exports = router   