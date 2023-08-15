const jwt = require("jsonwebtoken")
const SECRET_KEY = "SECRETKEY"


const auth = (req, res, next) => {
    try{

        // let token = req.query.token
        // let token = req.headers.authorization;
        let token = req.cookies.token
        if(token)
        {
            // token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id;
        }
        else{ 
            // res.status(401).json({ message : "Unauthorized User"})
            res.redirect('/')
        }
        next()
    }
    catch(error)
    {
        console.log(error);
        // res.status(401).json({ message : "Unauthorized User"})
        res.redirect('/')
    }
}

module.exports = auth;