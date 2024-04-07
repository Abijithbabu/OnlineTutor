const express = require('express')
const { getCourses, getUsers } = require('../controllers/adminController')
const router = express.Router()

router.get('/users/:type', getUsers)
router.get('/courses', getCourses)

module.exports = router   