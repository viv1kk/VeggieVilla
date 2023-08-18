const express = require('express');
const { getCurrentCartItems, removeCurrentCartItem, updateCartItem, removeCart } = require('../controllers/cartController');
const { checkCart } = require("../middlewares/checkCart");

const router = express.Router()


router.post('/get-current-cart-items', getCurrentCartItems)
router.post('/remove-current-cart-item', removeCurrentCartItem)
router.post('/update-cart', checkCart, updateCartItem)
router.post('/remove-cart', removeCart)


module.exports = router;