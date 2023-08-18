const mongoose = require('./connection')

const cartSchema = new mongoose.Schema({
    userid : String,
    cartItems : [{
        itemid : String,
        quantity : Number,
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;
