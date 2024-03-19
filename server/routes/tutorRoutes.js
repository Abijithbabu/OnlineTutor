const express = require('express')
const { upload } = require('../middlewares/multer')
const { createCourse, getCourses, editCourse, courseDetails, updateProfile } = require('../controllers/tutorController')
const router = express.Router()

router.post('/createCourse', upload.single('image'), createCourse)
router.post('/editCourse', upload.single('image'), editCourse)
router.get('/fetchCourses', getCourses)
router.get('/courseDetails', courseDetails)
router.post('/updateProfile', upload.single('image'), updateProfile)

module.exports = router   