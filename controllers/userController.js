const userModel = require("../models/User")
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "SECRETKEY"

const login =  async (req, res) => {
    const { email, password, remember } = req.body
    try{
        // Existing User Check
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            return res.status(404).json({ message : "User not found" })
        }
        // matching Password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({ message : "Invalid Credentials" })
        }
        // Creating Session
        req.session.email = existingUser.email;
        res.status(201).json({ message : "Login Successful "})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

const logout = (req, res) => {
    if(req.session.email){
        req.session.destroy()
        console.log("Logged Out!")
        res.status(201).json({ message : "Logged out"})
    }
    else{
        res.status(201).json({ message : "Session Not Found!"})
    }
}

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

module.exports = { login, logout, signup, deleteUser };