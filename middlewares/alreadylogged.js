const alreadylogged = (req, res, next) => {
    try{
        if(req.session.userid)
        {
            res.redirect('/dashboard')
        }
        else{
            console.log("User not Logged in!");
            next()
        }
    }
    catch(error)
    {
        console.log("User not Logged in!");
        next()
    }
}

module.exports = alreadylogged;