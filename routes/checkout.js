const express = require('express');
const router = express.Router()
const { createCheckoutSession } = require('../controllers/checkoutController')
const { addCheckoutANDCartData } = require('../middlewares/addCheckoutANDCartData') 

router.post('/create-checkout-session', addCheckoutANDCartData, createCheckoutSession)

module.exports = router 