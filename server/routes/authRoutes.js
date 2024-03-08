const express = require('express')
const { signup, login, sendOtp, logout } = require('../controllers/authController')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/sendOtp', sendOtp)
router.post('/logout', logout)

module.exports = router   