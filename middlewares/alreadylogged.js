const jwt = require("jsonwebtoken")
const SECRET_KEY = "SECRETKEY"


const alreadylogged = (req, res, next) => {
    try{

        let token = req.cookies.token
        if(token)
        {
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id;
            res.redirect('dashboard')
        }
        else{
            console.log("User not Logged in!");
        }
        next()
    }
    catch(error)
    {
        console.log("User not Logged in!");
    }
}

module.exports = alreadylogged;