const express = require('express');
const { signup, getUserProfile, updateUserProfile, deleteUser} = require('../controllers/userController');
const router = express.Router()


router.post('/signup', signup)
router.post('/get-user-profile',  getUserProfile)
router.post('/update-user-profile', updateUserProfile)
router.post('/delete-user', deleteUser)

module.exports = router;