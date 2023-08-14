const pantryModel = require("../models/Pantry");



const getItems = async(req, res)=>{
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

module.exports = { addItem, getItems, removeItem }