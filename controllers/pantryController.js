const pantryModel = require("../models/Pantry");


// only the ones that are present in Stock
const getItems = async(req, res)=>{
    try{
        const items = await pantryModel.find({item_available_qt : {$gt : 0}})
        res.status(201).json(items)
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

// get all will include the items that are not present in the stock
const getAllItems = async(req, res)=>{
    try{
        const items = await pantryModel.find()
        res.status(201).json(items)
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}


// this is just to insert data to the database
const addItem = async(req, res)=>{
    const { item_name } = req.body;
    try{
        // Check Existing Entry
        const existingItem = await pantryModel.findOne({ item_name : item_name })
        if(existingItem){
            return res.status(404).json({ message : "Item already Exists!" })
        }
        await pantryModel.create(req.body)
        res.status(201).json({message : item_name})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong"});
    }
}


// Right now only item quantity can be updated
const updateItem = async(req, res)=>{
    const item  = req.body;
    try{
        // Check Existing Entry
        console.log(item)
        const existingItem = await pantryModel.findOneAndUpdate({_id:item.itemid}, {$set:{item_available_qt : item.quantity}},{new:true})
        if(!existingItem){
            throw new Error("Item not Found")
        }
        res.status(201).json({message : existingItem})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : error.message});
    }
}
 
const removeItem = async(req, res)=>{
    const { item_name } = req.body;
    try{
        // Check Existing Entry
        const existingItem = await pantryModel.findOne({ item_name : item_name })
        if(!existingItem){
            return res.status(404).json({ message : "Item not Found!" })
        }
        await pantryModel.deleteOne({item_name : item_name})
        res.status(201).json({message : "Successfully deleted", item_deleted : existingItem})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

module.exports = { addItem, getItems, getAllItems, updateItem, removeItem }