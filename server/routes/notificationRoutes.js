const express = require('express')
const { saveSubscription, sendNotification } = require('../controllers/notificationController')
const router = express.Router()

router.post('/save-subscription', saveSubscription)
router.get('/send-notification', sendNotification)


module.exports = router   