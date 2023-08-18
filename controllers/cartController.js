const cartModel = require("../models/Cart")



const getCurrentCartItems = async (req, res)=>{
    const userid = req.session.userid
    // Also make check whether ther item is avaliable

    try{
        let result = await cartModel.findOne({"userid": userid})
        res.status(200).json({cartItems : result.cartItems})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)
    }
}

const removeCurrentCartItem = async (req, res)=>{
    const userid = req.session.userid
    const { itemid } = req.body;

    // Also make check whether ther item is avaliable


    // find the cart if not found create one
    try{
        let result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        if(result.cartItems.length === 0)
        {
            //item is not in cart
            response.status(400).json({message : "Item is not in Cart"})
        }
        else
        {
            await cartModel.updateOne({userid : userid}, {$pull : { cartItems : {itemid : itemid}}})
        }
        result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        res.status(201).json({message : "Removed from the  Cart", reuslt : result})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)
    }
}

const updateCartItem = async (req, res)=>{
    const userid = req.session.userid
    const {itemid, quantity} = req.body;

    // Also make check whether ther item is avaliable


    // update the cart
    try{
        let result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        if(result.cartItems.length === 0)
        {
            await cartModel.updateOne({userid : userid}, {$push : { cartItems : {itemid : itemid, quantity:quantity }}})
        }
        else
        {
            await cartModel.findOneAndUpdate(
                { userid: userid, 'cartItems.itemid': itemid },
                { $set: { 'cartItems.$.quantity': quantity } },
                { new: true })
        }
        result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        res.status(201).json({message : "Updated the Cart", reuslt : result})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)
    }
}

const removeCart = async (req, res)=>{
    const { userid } = req.body
    try{
        const result = await cartModel.deleteOne({ userid : userid })
        res.status(200).json({ message : "User Cart Deleted Successfully", result : result })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { getCurrentCartItems, removeCurrentCartItem, updateCartItem, removeCart }
