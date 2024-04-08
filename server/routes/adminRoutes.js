const express = require('express')
const { getCourses, getUsers, blockUser } = require('../controllers/adminController')
const router = express.Router()

router.get('/users/:type', getUsers)
router.get('/courses', getCourses)
router.get('/blockuser/:id', blockUser)

module.exports = router   