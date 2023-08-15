const userModel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRETKEY"


const login =  async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try{
        // Existing User Check
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            return res.status(404).json({ message : "User not found" })
        }

        // matching Password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword)
        {
            return res.status(400).json({ message : "Invalid Credentials" })
        }

        // Generating Token
        const token = jwt.sign({ email : existingUser.email, id : existingUser._id }, SECRET_KEY, { expiresIn : '1d'});
        // res.status(201).json({ user : existingUser, token: token })
        res.status(201).cookie('token', token).send('cookie set')
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
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

        // Token Generate
        const token = jwt.sign({ email : result.email, id : result._id }, SECRET_KEY);
        res.status(201).json({ user : result, token: token })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

module.exports = { login, signup };