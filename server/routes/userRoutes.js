const express = require('express')
const { subscribe, getCourses, bookmark } = require('../controllers/userController')
const router = express.Router()

router.post('/subscribe', subscribe)
router.post('/getCourses', getCourses)
router.post('/bookmark', bookmark)


module.exports = router   