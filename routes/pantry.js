const express = require('express');
const { addItem, getItems, removeItem } = require('../controllers/pantryController');
const router = express.Router()


router.post('/add', addItem)
router.post('/get', getItems)
router.post('/remove', removeItem)

module.exports = router;