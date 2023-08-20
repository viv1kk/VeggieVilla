const cartModel = require("../models/Cart")
const pantryModel = require("../models/Pantry")



//helper function
const insertItemInfoInCartItems = async (resl)=>{
    const len = resl.cartItems.length
    let data = []
    for (let i = 0; i < len; i++)
    {
        let copy = JSON.parse(JSON.stringify(resl.cartItems[i]))
        const pantryItem = await pantryModel.findOne({_id : copy.itemid})
        if(pantryItem)
        {
            copy.item_img = pantryItem.img
            copy.item_name = pantryItem.item_name
            copy.item_price = pantryItem.item_price
            data.push(copy);
        }
    }
    return data
}

const getCurrentCartItems = async (req, res)=>{
    
    const userid = req.cookies.userid
    // Also make check whether ther item is avaliable
    try{
        const result = await cartModel.findOne({"userid": userid})
        const cart =  await insertItemInfoInCartItems(result)
        res.status(201).json({cartItems : cart})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : error})
    }
}

const removeCurrentCartItem = async (req, res)=>{
    const userid = req.cookies.userid
    const { itemid } = req.body;

    // Also make check whether ther item is avaliable
    
    // find the cart if not found create one
    try{
        let result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        if(result.cartItems.length === 0){
            //item is not in cart
            response.status(400).json({message : "Item is not in Cart"})
        }
        else{
            await cartModel.updateOne({userid : userid}, {$pull : { cartItems : {itemid : itemid}}})
        }
        // result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        res.status(201).json({message : "Item Removed from Cart", result : result.cartItems[0]})
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const updateCartItem = async (req, res, next)=>{

    const checkQuantityZero = (data)=>{
        if(data.quantity == 0)
        {
            req.body = {
                itemid : data.itemid
            }
            console.log("Removing")
            removeCurrentCartItem(req, res);
            return 0
        }
        return 1
    }

    const userid = req.cookies.userid
    const {itemid, quantity} = req.body;

    // Also make check whether ther item is avaliable
    

    // update the cart
    try{
        let result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        if(result.cartItems.length === 0){
            await cartModel.updateOne({userid : userid}, {$push : { cartItems : {itemid : itemid, quantity:quantity, createdAt : new Date() }}})
        }
        else{
            await cartModel.findOneAndUpdate(
                { userid: userid, 'cartItems.itemid': itemid },
                { $inc: { 'cartItems.$.quantity': quantity } },
                { new: true })
        }
        result = await cartModel.findOne({"userid": userid},{"cartItems": {$elemMatch: {itemid : itemid}}})
        const cart =  await insertItemInfoInCartItems(result)

        // check quantity zero -> if zero remove from database
        if(checkQuantityZero(cart[0]))
            res.status(201).json({message : "Updated the Cart", result : cart[0]})
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const removeCart = async (req, res)=>{
    const { userid } = req.body
    try{
        const result = await cartModel.deleteOne({ userid : userid })
        if(result.deletedCount == 0){
            res.status(500).json({ message : "User's Cart not Found!", result : result })
        }else{            
            res.status(200).json({ message : "User Cart Deleted Successfully", result : result })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { getCurrentCartItems, removeCurrentCartItem, updateCartItem, removeCart }
