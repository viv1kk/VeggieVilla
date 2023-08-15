const express = require('express');
const { login, logout, signup, deleteUser } = require('../controllers/userController');
const router = express.Router()


router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.post('/delete-user', deleteUser)

module.exports = router;