const userModel = require("../models/User")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    
    const { name, email, password, confirm_password } = req.body

    try{
        // Existing User Check
        const existingUser = await userModel.findOne({ email : email })
        if(existingUser){
            return res.status(400).json({ message : "User already exists" })
        }

        if(password != confirm_password)
        {
            return res.status(401).json({ message : "Wrong Confirm Password" })
        }

        //Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // User Creation
        const result = await userModel.create({
            name : name,
            email : email,
            password : hashedPassword,
        })

        res.status(201).json({ message : "Account Created!"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}


const deleteUser = async(req, res)=>{
    const { email } = req.body
    try{
        // Existing User Check
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            return res.status(404).json({ message : "User not found" })
        }
        await userModel.deleteOne({ email : email })
        res.status(201).json({ message : "Deleted User Successful ", user : existingUser})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

const getUserProfile = async (req, res)=>{
    // res.status(201).json({ message : req.session.userid})
    // TODO: filter the data before sending the data  
    const userid = req.cookies.userid;
    const userinfo = await userModel.findOne({_id : userid });
    res.status(201).json(userinfo)
}

const updateUserProfile = async (req, res)=>{ 
    const userid = req.cookies.userid;
    let data = req.body
    // assuming data comes filtered.
    try{
        const status = await userModel.updateOne({_id : userid },{$set : req.body});
        const updatedinfo = await userModel.findOne({ _id : userid })
        res.status(201).json({ update_status : status, userinfo : updatedinfo })
    }
    catch(error)
    {
        res.status(400).json({ error : "Something just broke"})
    }
}



module.exports = { signup, deleteUser, getUserProfile, updateUserProfile }