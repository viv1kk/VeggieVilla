
const auth = (req, res, next) => {
    try{
     if(req.session.userid)
        {
            console.log("Authenticated link ^")
            next()
        }
        else{ 
            // res.status(401).json({ message : "Unauthorized User"})
            res.redirect('/')
        }
    }
    catch(error)
    {
        console.log(error);
        // res.status(401).json({ message : "Unauthorized User"})
        res.redirect('/')
    }
}

module.exports = auth;